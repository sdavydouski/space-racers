import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RacesComponent} from "./races.component";
import {NewRaceComponent} from "./new-race/new-race.component";
import {TypewriterComponent} from "./typewriter/typewriter.component";
import {RacesRouting} from './races.routes';
import {SocketService} from "./socket.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RacesRouting
    ],
    declarations: [
        RacesComponent,
        NewRaceComponent,
        TypewriterComponent
    ],
    providers: [
        SocketService
    ]
})
export default class RacesModule {

}
