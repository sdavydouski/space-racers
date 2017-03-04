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
            .map(races => {
                let racesArray = [];

                Object.keys(races).forEach(raceId => {
                    let race = {
                        id: raceId,
                        ...races[raceId]
                    };

                    let racers = [];
                    Object.keys(races[raceId].racers).forEach(racerId => {
                        racers.push({
                            id: racerId,
                            ...races[raceId].racers[racerId]
                        })
                    });
                    race.racers = racers;

                    racesArray.push(race);
                });

                return racesArray;
            })
            .do(races => {
                this.races = races;
            })
            .flatMap(() => Observable.merge(
                this.socketService.on$('add-race')
                    .map(race => {
                        race.racers = [];
                        return race;
                    })
                    .do(race => this.races.unshift(race)),

                this.socketService.on$('remove-race')
                    .do(id => {
                        let index = this.races.findIndex(race => race.id === id);
                        this.races.splice(index, 1);
                    }),

                this.socketService.on$('join-race')
                    .do(({raceId, racer}) => {
                        let race = this.races.find(race => race.id === raceId);
                        race.racers.push(racer);
                    }),

                this.socketService.on$('leave-race')
                    .do(({raceId, racerId}) => {
                        let race = this.races.find(race => race.id === raceId);
                        let index = race.racers.findIndex(racer => racer.id === racerId);
                        race.racers.splice(index, 1);
                    })
            ))
            .subscribe();
    }

    ngOnDestroy(): void {
        this.socketSubscription.unsubscribe();
    }

}
