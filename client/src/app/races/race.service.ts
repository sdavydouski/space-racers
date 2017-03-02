import {Injectable} from "@angular/core";
import {SocketService} from "./socket.service";

@Injectable()
export class RaceService {
    races: Array<any> = [];

    constructor(private socketService: SocketService) {}

    getRaces() {

    }
}
