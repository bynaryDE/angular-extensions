import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { addClass } from '../public-api';

import { useClass } from './class.composable';

@Component({
    template: ''
})
class TestComponent {
    constructor() {
        addClass('test');
    }
}

describe('addClass', () => {

    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ TestComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);

        fixture.detectChanges();
    });

    it('should be a function', () => {
        expect(typeof useClass).toEqual('function');
    });

    it('should add the class', () => {
        expect(fixture.debugElement.classes['test']).toBeTruthy();
    });

});
