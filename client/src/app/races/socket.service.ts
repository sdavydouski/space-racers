import {Injectable} from "@angular/core";
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {Observable} from "rxjs";

@Injectable()
export class SocketService {
    url: string = location.origin;
    socket: Socket;

    constructor() {}

    connect(): void {
        this.socket = io(this.url);

        this.socket.on('connect', () => {
            console.log('connected ', this.socket.id);
        });

        this.socket.on('disconnect', () => {
            console.log('disconnected ');
        });
    }

    emit(event: string, data?: any): void {
        this.socket.emit(event, data);
    }

    on$(event: string): Observable<any> {
        return Observable.create(observer => {
            this.socket.on(event, data => {
                console.log(data);
                observer.next(data);
            });

            return () => {
                this.socket.off(event);
            };
        });
    }

    disconnect(): void {
        this.socket.disconnect();
    }
}
