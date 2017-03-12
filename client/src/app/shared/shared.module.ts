import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {RouterModule} from "@angular/router";
import {TopHeaderComponent} from "./top-header/top-header.component";
import {LoginComponent} from "./login/login.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        TopHeaderComponent,
        MainMenuComponent,
        LoginComponent
    ],
    exports: [
        TopHeaderComponent,
        MainMenuComponent,
        LoginComponent
    ]
})
export class SharedModule {

}
