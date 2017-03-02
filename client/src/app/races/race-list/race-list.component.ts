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
        this.socketService.emit('get-races');

        this.socketSubscription = this.socketService.on$('get-races')
            .do(races => {
                this.races = races;
            })
            .flatMap(() => Observable.merge(
                this.socketService.on$('add-race')
                    .do(race => this.races.unshift(race)),
                this.socketService.on$('remove-race')
                    .do(raceId => {
                        let raceIndex = this.races.findIndex(race => race.id === raceId);

                        if (raceIndex > -1) {
                            this.races.splice(raceIndex, 1)
                        }
                    }),
                this.socketService.on$('join-race')
                    .do(data => {
                        let race = this.races.find(race => race.id === data.raceId);
                        race.racers.push(data.racer);
                    }),
                this.socketService.on$('leave-race')
                    .do(data => {
                        let race = this.races.find(race => race.id === data.raceId);
                        let racerIndex = race.racers.findIndex(racer => racer.id === data.racerId);

                        if (racerIndex > -1) {
                            race.racers.splice(racerIndex, 1);
                        }
                    }),
                this.socketService.on$('update-races-countdown')
                    .do(updatedRaces => {
                        updatedRaces.forEach(updatedRace => {
                            let race = this.races.find(race => race.id === updatedRace.id);
                            // todo: could be better
                            if (race) {
                                race.countdown = updatedRace.countdown;
                            }
                        });
                    })
            ))
            .subscribe();
    }

    ngOnDestroy(): void {
        this.socketSubscription.unsubscribe();
    }

}
