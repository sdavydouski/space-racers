/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TypewriterComponent } from './typewriter.component';

describe('TypewriterComponent', () => {
    let component: TypewriterComponent;
    let fixture: ComponentFixture<TypewriterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TypewriterComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypewriterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
