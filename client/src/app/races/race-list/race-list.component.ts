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

    constructor(private socketService: SocketService) {}

    ngOnInit(): void {
        this.socketService.emit('init-races');

        this.initRacesSubscription = this.socketService.on$('init-races')
            .subscribe(races => {
                this.races = races;
            });

        this.addRaceSubscription = this.socketService.on$('add-race')
            .subscribe(race => {
                this.races.push(race);
            });

        this.removeRaceSubscription = this.socketService.on$('remove-race')
            .subscribe(race => {
                // todo: handle -1 index
                this.races.splice(this.races.indexOf(race), 1);
            });
    }

    ngOnDestroy(): void {
        //todo: find better ways to do this
        this.initRacesSubscription.unsubscribe();
        this.addRaceSubscription.unsubscribe();
        this.removeRaceSubscription.unsubscribe();
    }

}
