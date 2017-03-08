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

                let racers = [];
                Object.keys(race.racers).forEach(key => racers.push({
                    id: key,
                    ...race.racers[key]
                }));

                this.race.racers = racers;

                this.racerId = uuid();
                this.socketService.emit('join-race', this.race.id, this.racerId);
            })
            .flatMap(() => Observable.merge(
                this.socketService.on$('join-race')
                    .filter(({raceId}) => this.race.id === raceId)
                    .do(({racer}) => this.race.racers.push(racer)),
                this.socketService.on$('leave-race')
                    .do(({racerId}) => {
                        let index = this.race.racers.indexOf(racerId);
                        this.race.racers.splice(index, 1);
                    }),
                this.socketService.on$('racer-move')
                    .do(updatedRacer => {
                        let racer = this.race.racers.find(racer => racer.id === updatedRacer.id);
                        racer.distance = updatedRacer.distance;
                    }),
                this.socketService.on$('race-finished')
                    .do(updatedRacer => {
                        let racer = this.race.racers.find(racer => racer.id === updatedRacer.id);
                        racer.result = updatedRacer.result;
                    })
            ))
            .subscribe();
    }

    onMove(raceSnapshot: any): void {
        //todo: could keep current racer as property
        let racer = this.race.racers.find(racer => racer.id === this.racerId);
        racer.distance = (raceSnapshot.current / raceSnapshot.total) * 100;

        this.socketService.emit('racer-move', this.race.id, racer);
    }

    onFinished(raceInfo: any): void {
        this.socketService.emit('race-finished', this.race.id, this.racerId);
    }

    ngOnDestroy(): void {
        console.log('clean up');
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
