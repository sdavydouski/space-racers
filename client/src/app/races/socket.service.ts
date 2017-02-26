import {Injectable} from "@angular/core";
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {Observable} from "rxjs";

@Injectable()
export class SocketService {
    url: string = location.origin;
    socket: Socket;

    constructor() {}

    connect(namespace: string): void {
        this.socket = io(this.url + namespace);

        this.socket.on('connect', () => {
            console.log('connected ', this.socket.id);
        });

        this.socket.on('disconnect', () => {
            console.log('disconnected');
        });
    }

    emit(event: string, ...args: any[]): void {
        this.socket.emit(event, ...args);
    }

    on$(event: string): Observable<any> {
        return Observable.create(observer => {
            this.socket.on(event, data => observer.next(data));

            return () => this.socket.off(event);
        });
    }

    disconnect(): void {
        this.socket.disconnect();
    }
}
