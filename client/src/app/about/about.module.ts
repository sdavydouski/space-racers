import {NgModule} from "@angular/core";
import {AboutComponent} from "./about.component";
import {CommonModule} from "@angular/common";
import {AboutRouting} from './about.routes';

@NgModule({
    imports: [
        CommonModule,
        AboutRouting
    ],
    declarations: [
        AboutComponent
    ]
})
export default class AboutModule {

}
