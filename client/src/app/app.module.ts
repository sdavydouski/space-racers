import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRouting} from './app.routes';
import {SocketService} from "./races/socket.service";
import {MainMenuComponent} from "./main-menu/main-menu.component";

@NgModule({
    imports: [
        BrowserModule,
        AppRouting
    ],
    declarations: [
        AppComponent,
        MainMenuComponent
    ],
    providers: [
        SocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
