import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RacesComponent} from "./races.component";
import {NewRaceComponent} from "./new-race/new-race.component";
import {TypewriterComponent} from "./typewriter/typewriter.component";
import {RacesRouting} from './races.routes';
import {RaceComponent} from "./race/race.component";
import {RaceListComponent} from "./race-list/race-list.component";
import {RaceService} from "./race.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RacesRouting
    ],
    declarations: [
        RacesComponent,
        RaceComponent,
        NewRaceComponent,
        RaceListComponent,
        TypewriterComponent
    ],
    providers: [
        RaceService
    ]
})
export default class RacesModule {

}
