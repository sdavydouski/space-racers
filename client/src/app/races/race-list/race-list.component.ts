import {Component} from "@angular/core";
import {SocketService} from "../socket.service";
@Component({
    selector: 'race-list',
    templateUrl: 'race-list.component.html'
})
export class RaceListComponent {
    races: any;

    constructor(private socketService: SocketService) {
        socketService.emit('init-races');

        socketService.on$('init-races')
            .subscribe(races => {
                console.log(races);
                this.races = [];
                // races.length && races.forEach(race => {
                //     this.races.set(race.id, race);
                // })
                if (races.length) {
                    this.races = races;
                }
            });

        socketService.on$('add-race')
            .subscribe(race => {
                this.races.push(race);
            });

        socketService.on$('remove-race')
            .subscribe(race => {
                //this.races.delete(race.id);
            });
    }

}
