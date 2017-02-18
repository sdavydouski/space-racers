import {RouterModule} from "@angular/router";
import {RacesComponent} from "./races.component";

const routes = [
    {
        path: '',
        component: RacesComponent
    }
];

export const RacesRouting =  RouterModule.forChild(routes);
