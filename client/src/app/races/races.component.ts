import {Component} from "@angular/core";

@Component({

    template: `
        <!--<typewriter [text]="text" (onFinished)="onFinished($event)"></typewriter>-->
        <new-race></new-race>
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
