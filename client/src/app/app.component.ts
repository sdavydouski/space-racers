import {Component} from '@angular/core';
import {SocketService} from "./races/socket.service";

@Component({
    selector: 'app-root',
    styles: [`
        a{
            text-decoration: none;
        }
        
        a.active{
            font-weight: bold;
        }
    `],
    template: `
    <nav>
        <a *ngFor="let nav of navs"
            [routerLink]="nav.url" 
            routerLinkActive="active"
            [routerLinkActiveOptions]="{exact:true}"
            >
            {{nav.content}}
        </a>
    </nav>
    <router-outlet></router-outlet>
    `
})
export class AppComponent {
    navs = [
        {url: '', content: 'Home'},
        {url: 'races', content: 'Races'}
    ];

    constructor(private socketService: SocketService) {
        socketService.connect();
    }

    ngOnDestroy(): void {
        this.socketService.disconnect();
    }
}
