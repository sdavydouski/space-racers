import {Component, OnInit, OnDestroy} from "@angular/core";
import {SocketService} from "../socket.service";
import {Subscription, Observable} from "rxjs";

@Component({
    selector: 'race-list',
    templateUrl: 'race-list.component.html'
})
export class RaceListComponent implements OnInit, OnDestroy {
    races: Array<any>;
    socketSubscription: Subscription;

    constructor(private socketService: SocketService) {}

    ngOnInit(): void {
        this.socketService.emit('init-races');

        this.socketSubscription = this.socketService.on$('init-races')
            .take(1)
            .do(races => {
                this.races = races;
            })
            .flatMap(() => Observable.merge(
                this.socketService.on$('add-race')
                    .do(race => this.races.unshift(race)),
                this.socketService.on$('remove-race')
                    .do(race => this.races.splice(this.races.indexOf(race), 1)),
                this.socketService.on$('join-race')
                    .do(data => {
                        let race = this.races.find(race => race.id === data.raceId);
                        race.racers.push(data.racerId);
                    }),
                this.socketService.on$('leave-race')
                    .do(data => {
                        let race = this.races.find(race => race.id === data.raceId);
                        race.racers.splice(race.racers.indexOf(data.racerId), 1);
                    })
            ))
            .subscribe();
    }

    ngOnDestroy(): void {
        this.socketSubscription.unsubscribe();
    }

}
