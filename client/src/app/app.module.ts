import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRouting} from './app.routes';
import {SocketService} from "./races/socket.service";

@NgModule({
    imports: [
        BrowserModule,
        AppRouting
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        SocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
