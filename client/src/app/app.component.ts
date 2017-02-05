import {Component, OnInit, OnDestroy} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    text = `One Ring to rule them all`;

    private url = 'http://localhost:3000';
    private socket;
    messages = [];
    connection;
    message;

    ngOnInit() {
        this.connection = this.getMessages().subscribe(message => {
            this.messages.push(message);
        })
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }

    sendMessage() {
        this.socket.emit('add-message', this.message);
        this.message = '';
    }

    getMessages() {
        return new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('message', data => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            }
        });
    }

    onFinished(raceInfo: any) {
        console.log('Race is finished!', raceInfo);
    }
}
