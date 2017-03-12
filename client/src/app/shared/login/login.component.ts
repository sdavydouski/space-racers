import {Component, ViewChild} from "@angular/core";
import * as $ from 'jquery';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent {
    @ViewChild('login') login;

    toggleLogin() {
        $(this.login.nativeElement).toggleClass('hidden');
    }
}
