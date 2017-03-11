import {Component, ViewChild, HostListener, OnInit} from "@angular/core";
import * as $ from 'jquery';
import {Router, NavigationStart} from "@angular/router";

@Component({
    selector: 'main-menu',
    templateUrl: 'main-menu.component.html',
    styleUrls: ['main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
    @ViewChild('menu') menu;

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe(event => {
                event.url === '/' ? this.showMenu() : this.hideMenu();
            });
    }

    toggleMenu() {
        $(this.menu.nativeElement).toggleClass('hidden');
    }

    showMenu() {
        $(this.menu.nativeElement).removeClass('hidden');
    }

    hideMenu() {
        $(this.menu.nativeElement).addClass('hidden');
    }

    @HostListener('document:keydown', ['$event'])
    onEsc({key}) {
        // wrap into observable
        if (key === 'Escape') {
            this.toggleMenu();
        }
    }

}
