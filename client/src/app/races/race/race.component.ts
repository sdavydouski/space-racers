import {Component, OnDestroy, OnInit, HostListener} from "@angular/core";
import {SocketService} from "../socket.service";
import {ActivatedRoute} from "@angular/router";
import uuid from 'uuid/v1';
import {Subscription} from "rxjs";

@Component({
    templateUrl: 'race.component.html'
})
export class RaceComponent implements OnInit, OnDestroy {
    raceId: string;
    racerId: string;
    race: any = {};

    getRaceInfoSubscription: Subscription;
    joinRaceSubscription: Subscription;
    leaveRaceSubscription: Subscription;

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

        this.getRaceInfoSubscription = this.socketService.on$('get-race-info')
            .take(1)
            .subscribe(race => {
                this.race = race;
                this.socketService.emit('join-race', this.raceId, this.racerId);
            });

        this.joinRaceSubscription = this.socketService.on$('join-race')
            .subscribe(data => {
                this.race.racers.push(data.racerId);
            });

        this.leaveRaceSubscription = this.socketService.on$('leave-race')
            .subscribe(data => {
                let racerIndex = this.race.racers.indexOf(data.racerId);
                this.race.racers.splice(racerIndex, 1);
            });
    }

    ngOnDestroy(): void {
        this.cleanUp();
    }

    @HostListener('window:beforeunload')
    beforeunloadHandler() {
        this.cleanUp();
    }

    cleanUp() {
        this.getRaceInfoSubscription.unsubscribe();
        this.joinRaceSubscription.unsubscribe();
        this.leaveRaceSubscription.unsubscribe();
        this.socketService.emit('leave-race', this.raceId, this.racerId);
    }
}
