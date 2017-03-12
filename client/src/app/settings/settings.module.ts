import {NgModule} from "@angular/core";
import {SettingsComponent} from "./settings.component";
import {CommonModule} from "@angular/common";
import {SettingsRouting} from './settings.routes';

@NgModule({
    imports: [
        CommonModule,
        SettingsRouting
    ],
    declarations: [
        SettingsComponent
    ]
})
export default class SettingsModule {

}
