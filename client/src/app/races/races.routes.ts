import {RouterModule} from "@angular/router";
import {RacesComponent} from "./races.component";
import {RaceComponent} from "./race/race.component";
import {NewRaceComponent} from "./new-race/new-race.component";

const routes = [
    {
        path: '',
        component: RacesComponent
    },
    {
        path: 'new',
        component: NewRaceComponent
    },
    {
        path: ':id',
        component: RaceComponent
    }
];

export const RacesRouting =  RouterModule.forChild(routes);
