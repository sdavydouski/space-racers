import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RacesComponent} from "./races.component";
import {TypewriterComponent} from "./typewriter/typewriter.component";
import {RacesRouting} from './races.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RacesRouting
    ],
    declarations: [
        RacesComponent,
        TypewriterComponent
    ]
})
export default class RacesModule {

}
