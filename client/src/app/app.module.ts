import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRouting} from './app.routes';
import {SocketService} from "./races/socket.service";
import {SharedModule} from "./shared/shared.module";

@NgModule({
    imports: [
        BrowserModule,
        AppRouting,
        SharedModule
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
