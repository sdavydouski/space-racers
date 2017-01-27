import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
    selector: 'app-typewriter',
    templateUrl: './typewriter.component.html',
    styleUrls: ['./typewriter.component.css']
})
export class TypewriterComponent implements OnInit {
    @Input() text: string;

    words: Array<string>;
    currentWord: string = '';
    currentWordIndex: number = 0;

    input$ = new Subject();

    constructor() {
        this.input$
            .do(() => {
                if (this.words[this.currentWordIndex].startsWith(this.currentWord) &&
                    this.words[this.currentWordIndex].length === this.currentWord.length) {
                    this.currentWord = '';
                    this.currentWordIndex++;
                }
            })
            .subscribe();
    }

    ngOnInit() {
        this.words = this.text.replace(/\s+/g,' ').split(' ');
    }

}
