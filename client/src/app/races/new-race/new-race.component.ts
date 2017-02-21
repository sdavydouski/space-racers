import {Component} from "@angular/core";
import Socket = SocketIOClient.Socket;
import {SocketService} from "../socket.service";
import uuid from 'uuid/v1';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'new-race',
    templateUrl: 'new-race.component.html'
})
export class NewRaceComponent {
    raceTypes?: Array<string>;

    constructor(private socketService: SocketService, private router: Router, private route: ActivatedRoute) {
        this.socketService.emit('get-race-types');
        this.socketService.on$('get-race-types')
            .subscribe(raceTypes => {
                this.raceTypes = raceTypes;
            });
    }

    go(raceType: string): void {
        let id = uuid();

        this.socketService.emit('add-race', {
            id: id,
            type: raceType
        });

        this.router.navigate([`../${id}`], { relativeTo: this.route });
    }

}
