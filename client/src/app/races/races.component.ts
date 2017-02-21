import {Component, OnDestroy} from "@angular/core";
import {SocketService} from "./socket.service";

@Component({

    template: `
        <!--<typewriter [text]="text" (onFinished)="onFinished($event)"></typewriter>-->
        <a routerLink="new">New Race</a>
        <h3>Current races:</h3>
        <race-list></race-list>
    `
})
export class RacesComponent {
    text: string;
    url: string = location.origin;

    constructor() {
        this.text = 'It\'s the job that\'s never started as takes longest to finish.';
    }

    onFinished(raceInfo: any) {
        console.log('Race is finished!', raceInfo);
    }

}
