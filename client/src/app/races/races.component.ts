import {Component} from "@angular/core";

@Component({

    template: `
        <a routerLink="new">New Race</a>
        <h3>Current races:</h3>
        <race-list></race-list>
    `
})
export class RacesComponent {

    constructor() {}

}
