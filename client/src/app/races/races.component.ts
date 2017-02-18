import {Component} from "@angular/core";

@Component({
    template: `<app-typewriter [text]="text" (onFinished)="onFinished($event)"></app-typewriter>`
})
export class RacesComponent {
    text: string;

    constructor() {
        this.text = 'It\'s the job that\'s never started as takes longest to finish.';
    }

    onFinished(raceInfo: any) {
        console.log('Race is finished!', raceInfo);
    }
}
