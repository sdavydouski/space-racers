import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    text = `One Ring to rule them all`;

    onFinished(raceInfo: any) {
        console.log('Race is finished!', raceInfo);
    }
}
