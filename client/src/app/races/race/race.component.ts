import {Component, OnDestroy, OnInit, HostListener} from "@angular/core";
import {SocketService} from "../socket.service";
import {ActivatedRoute} from "@angular/router";
import uuid from 'uuid/v1';
import {Subscription, Observable} from "rxjs";

@Component({
    templateUrl: 'race.component.html'
})
export class RaceComponent implements OnInit, OnDestroy {
    raceId: string;
    racerId: string;
    race: any = {};

    socketSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private socketService: SocketService) {}

    ngOnInit(): void {
        this.racerId = uuid();

        this.route.url
            .map(segments => segments.join(''))
            .subscribe(raceId => {
                this.raceId = raceId;
                this.socketService.emit('get-race-info', this.raceId);
            });

        this.socketSubscription = this.socketService.on$('get-race-info')
            .take(1)
            .do(race => {
                this.race = race;
                this.socketService.emit('join-race', this.raceId, this.racerId);
            })
            .flatMap(() => Observable.merge(
                this.socketService.on$('join-race')
                    .do(data => this.race.racers.push(data.racerId)),
                this.socketService.on$('leave-race')
                    .do(data => {
                        let racerIndex = this.race.racers.indexOf(data.racerId);
                        this.race.racers.splice(racerIndex, 1);
                    })
            ))
            .subscribe();
    }

    onKeyPress(raceSnapshot: any): void {
        console.log(raceSnapshot);
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
        this.socketService.emit('leave-race', this.raceId, this.racerId);
    }
}
