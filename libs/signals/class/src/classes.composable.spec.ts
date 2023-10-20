import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { useClasses } from './classes.composable';

@Component({
    template: ''
})
class TestComponent {
    readonly classes = useClasses([ 'test', 'test2' ]);
}

describe('useClasses', () => {

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ TestComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be a function', () => {
        expect(typeof useClasses).toEqual('function');
    });

    it('should set the class initially, if an initial value has been defined', () => {
        expect(fixture.debugElement.classes).toEqual({
            test: true,
            test2: true
        });
    });

    it('should remove the previous classes and add new classes, when changing the signal\'s value', () => {
        component.classes.set([ 'foo', 'bar' ]);

        fixture.detectChanges();

        expect(fixture.debugElement.classes).toEqual({
            foo: true,
            bar: true
        });
    });

    it('should handle class strings', () => {
        component.classes.set('foo bar');

        fixture.detectChanges();

        expect(fixture.debugElement.classes).toEqual({
            foo: true,
            bar: true
        });
    });

    it('should handle class strings', () => {
        component.classes.set('foo bar');

        fixture.detectChanges();

        expect(fixture.debugElement.classes).toEqual({
            foo: true,
            bar: true
        });
    });

});
