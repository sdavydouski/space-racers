import {Component, OnDestroy, OnInit, HostListener} from "@angular/core";
import {SocketService} from "../socket.service";
import {ActivatedRoute} from "@angular/router";
import uuid from 'uuid/v1';
import {Subscription, Observable} from "rxjs";

@Component({
    templateUrl: 'race.component.html',
    styles: [`
        .track {
            padding: 1rem; 
            border: 2px dashed white;
        }
        
        .wrapper {
            width: 100%;
            transition: transform .2s ease-in-out;
        }
        
        .racer {
            border: 2px solid white; 
            display: inline-block;
            transition: transform .2s ease-in-out;
        }
    `]
})
export class RaceComponent implements OnInit, OnDestroy {
    raceId: string;
    racer: any;
    race: any = {};

    socketSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private socketService: SocketService) {}

    ngOnInit(): void {

        this.racer = {
            id: uuid(),
            distance: 0
        };

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
                this.socketService.emit('join-race', this.raceId, this.racer);
            })
            .flatMap(() => Observable.merge(
                this.socketService.on$('join-race')
                    .do(data => this.race.racers.push(data.racer)),
                this.socketService.on$('leave-race')
                    .do(data => {
                        let racerIndex = this.race.racers.indexOf(data.racerId);
                        this.race.racers.splice(racerIndex, 1);
                    }),
                this.socketService.on$('move')
                    .do(data => {
                        let racer = this.race.racers.find(racer => racer.id === data.racerId);
                        racer.distance = data.distance;
                    })
            ))
            .subscribe();
    }

    onMove(raceSnapshot: any): void {
        let racer = this.race.racers.find(racer => racer.id === this.racer.id);
        racer.distance = (raceSnapshot.current / raceSnapshot.total) * 100;

        this.socketService.emit('move', this.raceId, racer);
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
        this.socketService.emit('leave-race', this.raceId, this.racer);
    }
}
