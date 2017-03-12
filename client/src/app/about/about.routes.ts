import {AboutComponent} from "./about.component";
import {RouterModule} from "@angular/router";

const routes = [
    {
        path: '',
        component: AboutComponent
    }
];

export const AboutRouting =  RouterModule.forChild(routes);
