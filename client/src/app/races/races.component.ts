import {Component} from "@angular/core";
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

@Component({
    template: `<app-typewriter [text]="text" (onFinished)="onFinished($event)"></app-typewriter>`
})
export class RacesComponent {
    text: string;
    url: string = location.origin;
    socket: Socket;

    constructor() {
        this.text = 'It\'s the job that\'s never started as takes longest to finish.';

        this.socket = io(this.url);

        this.socket.on('connect', () => {
            console.log('connected ', this.socket.id);
        });

        this.socket.on('disconnect', () => {
            console.log('disconnected ', this.socket.id);
        });
    }

    onFinished(raceInfo: any) {
        console.log('Race is finished!', raceInfo);
    }
}
