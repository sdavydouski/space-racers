import {Component, OnInit, OnDestroy} from "@angular/core";
import Socket = SocketIOClient.Socket;
import {SocketService} from "../socket.service";
import uuid from 'uuid/v1';
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
    selector: 'new-race',
    templateUrl: 'new-race.component.html'
})
export class NewRaceComponent implements OnInit, OnDestroy {
    raceTypes: Observable<any>;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private socketService: SocketService,) {}

    go(raceType: string): void {
        let race = {
            id: uuid(),
            type: raceType
        };

        this.socketService.emit('add-race', race);

        this.router.navigate([`../${race.id}`], {
            relativeTo: this.route
        });
    }

    ngOnInit(): void {
        this.socketService.emit('get-race-types');
        this.raceTypes = this.socketService.on$('get-race-types')
    }

    ngOnDestroy(): void {

    }

}
