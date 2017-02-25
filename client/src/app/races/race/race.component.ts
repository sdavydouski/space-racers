import {Component, OnDestroy, OnInit} from "@angular/core";
import {SocketService} from "../socket.service";
import {ActivatedRoute} from "@angular/router";
@Component({
    templateUrl: 'race.component.html'
})
export class RaceComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
                private socketService: SocketService) {}

    ngOnInit(): void {
        this.route.url.subscribe(url => {
            console.log(url);
            //url.path -> is our id
        });
    }

    ngOnDestroy(): void {
        this.socketService.emit('leave-race');
    }
}
