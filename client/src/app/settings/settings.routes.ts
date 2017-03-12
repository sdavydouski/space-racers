import {SettingsComponent} from "./settings.component";
import {RouterModule} from "@angular/router";

const routes = [
    {
        path: '',
        component: SettingsComponent
    }
];

export const SettingsRouting =  RouterModule.forChild(routes);
