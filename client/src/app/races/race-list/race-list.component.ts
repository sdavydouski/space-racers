import {Component, OnInit, OnDestroy} from "@angular/core";
import {SocketService} from "../socket.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'race-list',
    templateUrl: 'race-list.component.html'
})
export class RaceListComponent implements OnInit, OnDestroy {
    races: Array<any>;
    initRacesSubscription: Subscription;
    addRaceSubscription: Subscription;
    removeRaceSubscription: Subscription;
    joinRaceSubscription: Subscription;
    leaveRaceSubscription: Subscription;

    constructor(private socketService: SocketService) {}

    ngOnInit(): void {
        this.socketService.emit('init-races');

        this.initRacesSubscription = this.socketService.on$('init-races')
            .subscribe(races => {
                this.races = races;
                console.info(races);
            });

        this.addRaceSubscription = this.socketService.on$('add-race')
            .subscribe(race => {
                this.races.unshift(race);
                console.info(this.races);
            });

        this.removeRaceSubscription = this.socketService.on$('remove-race')
            .subscribe(race => {
                // todo: handle -1 index
                this.races.splice(this.races.indexOf(race), 1);
            });

        this.joinRaceSubscription = this.socketService.on$('join-race')
            .subscribe(data => {
                let race = this.races.find(race => race.id === data.raceId);
                race.racers.push(data.racerId);
            });

        this.leaveRaceSubscription = this.socketService.on$('leave-race')
            .subscribe(data => {
                let race = this.races.find(race => race.id === data.raceId);
                race.racers.splice(race.racers.indexOf(data.racerId), 1);
            });
    }

    ngOnDestroy(): void {
        // http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription
        //todo: find better ways to do this
        this.initRacesSubscription.unsubscribe();
        this.addRaceSubscription.unsubscribe();
        this.removeRaceSubscription.unsubscribe();
        this.joinRaceSubscription.unsubscribe();
        this.leaveRaceSubscription.unsubscribe();
    }

}
