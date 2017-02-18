import {HomeComponent} from "./home.component";
import {RouterModule} from "@angular/router";

const routes = [
    {
        path: '',
        component: HomeComponent
    }
];

export const HomeRouting =  RouterModule.forChild(routes);
