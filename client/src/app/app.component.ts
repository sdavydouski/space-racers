import {Component, ViewEncapsulation} from '@angular/core';
import {SocketService} from "./races/socket.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    navs = [
        {url: '', content: 'Home'},
        {url: 'races', content: 'Races'}
    ];

    constructor(private socketService: SocketService) {
        socketService.connect('/racing');
    }

    ngOnDestroy(): void {
        this.socketService.disconnect();
    }
}
