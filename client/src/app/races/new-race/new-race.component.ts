import {Component} from "@angular/core";
import Socket = SocketIOClient.Socket;
import {SocketService} from "../socket.service";

@Component({
    selector: 'new-race',
    templateUrl: 'new-race.component.html'
})
export class NewRaceComponent {
    raceTypes?: Array<string>;

    constructor(public socketService: SocketService) {
        this.socketService.connect();

        this.socketService.emit('get-race-types');
        this.socketService.on$('get-race-types')
            .subscribe(raceTypes => {
                this.raceTypes = raceTypes;
            });
    }

}
