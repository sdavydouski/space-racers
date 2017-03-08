import {Component, OnInit, OnDestroy} from "@angular/core";
import Socket = SocketIOClient.Socket;
import {SocketService} from "../socket.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
    selector: 'new-race',
    templateUrl: 'new-race.component.html'
})
export class NewRaceComponent implements OnInit, OnDestroy {
    trackTypes: Observable<any>;
    addRaceSubscription: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private socketService: SocketService,) {}

    addRace(type: string): void {
        this.socketService.emit('add-race', type, 30);
        this.addRaceSubscription = this.socketService.on$('add-race')
            .subscribe(race => {
                this.router.navigate([`../${race.id}`], {
                    relativeTo: this.route
                });
            });
    }

    ngOnInit(): void {
        this.socketService.emit('get-track-types');
        this.trackTypes = this.socketService.on$('get-track-types')
    }

    ngOnDestroy(): void {
        //todo: is it really necessary?
        this.addRaceSubscription && this.addRaceSubscription.unsubscribe();
    }

}
