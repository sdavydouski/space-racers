import {Component, Input, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';
import {Subject} from "rxjs";

@Component({
    selector: 'typewriter',
    templateUrl: 'typewriter.component.html',
    styleUrls: ['typewriter.component.css']
})
export class TypewriterComponent implements OnInit, OnChanges {
    @Input() text: string;
    @Output() onMove: EventEmitter<any> = new EventEmitter();
    @Output() onFinished: EventEmitter<any> = new EventEmitter();

    words: Array<string>;
    currentWord: string = '';
    currentWordIndex: number = 0;
    numberOfErrors: number = 0;
    isCurrentWordIncorrect: boolean = false;
    input$ = new Subject();

    constructor() {
        this.input$
            .do(() => {
                if (this.hasError()) {
                    this.handleError();
                } else {
                    this.isCurrentWordIncorrect = false;
                    if (this.isWordFinished()) {
                        this.goToTheNextWord();
                    } else if (this.isTypingFinished()) {
                        this.goToTheNextWord();
                        this.finish();
                    }
                }

            })
            .subscribe();
    }

    ngOnInit(): void {
        if (!this.text) return;

        this.words = this.text.trim().replace(/\s+/g,' ').split(' ');
    }

    ngOnChanges(): void {
        if (!this.text) return;

        this.words = this.text.trim().replace(/\s+/g,' ').split(' ');
    }

    private hasError(): boolean {
        let isErrorInLastWord = this.isLastWord() && !this.isCorrect();
        let isErrorInOtherWords = this.isSpace() ?
            !this.isTheSameLength(this.currentWord.slice(0, -1)) ||
            ( this.isTheSameLength(this.currentWord.slice(0, -1)) &&
                !this.isCorrect(this.currentWord.slice(0, -1)) ) :
            !this.isCorrect();

        return isErrorInLastWord || isErrorInOtherWords;
    }

    private isWordFinished(): boolean {
        return this.isSpace() &&
               this.isCorrect(this.currentWord.slice(0, -1)) &&
               this.isTheSameLength(this.currentWord.slice(0, -1));
    }

    private isTypingFinished(): boolean {
        return this.isLastWord() && this.words[this.currentWordIndex] === this.currentWord;
    }

    private isSpace(): boolean {
        return this.currentWord.slice(-1) === ' ';
    }

    private isCorrect(word?: string): boolean {
        return this.words[this.currentWordIndex].startsWith(word || this.currentWord);
    }

    private isLastWord(): boolean {
        return this.words.length - 1 === this.currentWordIndex;
    }

    private isTheSameLength(word: string): boolean {
        return this.words[this.currentWordIndex].length === word.length;
    }

    private handleError(): void {
        if (!this.isCurrentWordIncorrect) {
            this.numberOfErrors++;
        }

        this.isCurrentWordIncorrect = true;
    }

    private goToTheNextWord(): void {
        this.currentWord = '';
        this.currentWordIndex++;

        this.onMove.emit({
            current: this.currentWordIndex,
            total: this.words.length
        });
    }

    private finish(): void {
        this.input$.complete();
        this.onFinished.emit({
            numberOfErrors: this.numberOfErrors
        });
    }

}
