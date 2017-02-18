import {RouterModule} from "@angular/router";

const routes = [
    {
        path: '',
        loadChildren: 'app/home/home.module'
    },
    {
        path: 'races',
        loadChildren: 'app/races/races.module'
    }
];

export const AppRouting =  RouterModule.forRoot(routes);
