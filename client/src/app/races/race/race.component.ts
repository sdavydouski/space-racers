import {Component, OnDestroy, OnInit, HostListener} from "@angular/core";
import {SocketService} from "../socket.service";
import {ActivatedRoute} from "@angular/router";
import uuid from 'uuid/v1';
import {Subscription, Observable} from "rxjs";

@Component({
    templateUrl: 'race.component.html',
    styleUrls: ['race.component.css']
})
export class RaceComponent implements OnInit, OnDestroy {
    race: any = {};
    racerId: any;

    socketSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private socketService: SocketService) {}

    ngOnInit(): void {
        this.route.url
            .map(segments => segments.join(''))
            .subscribe(raceId => {
                this.socketService.emit('get-race', raceId);
            });

        this.socketSubscription = this.socketService.on$('get-race')
            .do(race => {
                this.race = race;
                this.racerId = uuid();
                this.socketService.emit('join-race', this.race.id, this.racerId);
            })
            .flatMap(() => Observable.merge(
                this.socketService.on$('join-race')
                    .do(data => this.race.racers.push(data.racer)),
                this.socketService.on$('leave-race')
                    .do(data => {
                        let racerIndex = this.race.racers.indexOf(data.racerId);

                        if (racerIndex > -1) {
                            this.race.racers.splice(racerIndex, 1);
                        }
                    }),
                this.socketService.on$('racer-move')
                    .do(data => {
                        let racer = this.race.racers.find(racer => racer.id === data.racerId);
                        racer.distance = data.distance;
                    })
            ))
            .subscribe();
    }

    onMove(raceSnapshot: any): void {
        let racer = this.race.racers.find(racer => racer.id === this.racerId);
        racer.distance = (raceSnapshot.current / raceSnapshot.total) * 100;

        this.socketService.emit('racer-move', this.race.id, racer);
    }

    onFinished(raceInfo: any): void {
        console.log('Race is finished!', raceInfo);
    }

    ngOnDestroy(): void {
        this.cleanUp();
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler(event): void {
        this.cleanUp();
    }

    private cleanUp(): void {
        this.socketSubscription.unsubscribe();
        this.socketService.emit('leave-race', this.race.id, this.racerId);
    }
}
