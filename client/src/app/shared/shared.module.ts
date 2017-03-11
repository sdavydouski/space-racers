import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        MainMenuComponent
    ],
    exports: [
        MainMenuComponent
    ]
})
export class SharedModule {

}
