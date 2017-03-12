import {RouterModule} from "@angular/router";

const routes = [
    {
        path: '',
        loadChildren: 'app/home/home.module'
    },
    {
        path: 'races',
        loadChildren: 'app/races/races.module'
    },
    {
        path: 'settings',
        loadChildren: 'app/settings/settings.module'
    },
    {
        path: 'about',
        loadChildren: 'app/about/about.module'
    }
];

export const AppRouting =  RouterModule.forRoot(routes);
