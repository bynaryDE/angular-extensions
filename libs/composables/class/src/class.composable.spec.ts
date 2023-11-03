import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { useClass } from './class.composable';

@Component({
    template: ''
})
class TestComponent {
    readonly test = useClass('test');
    readonly highlighted = useClass('highlighted', { initialValue: true });
}

describe('useClass', () => {
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
        expect(typeof useClass).toEqual('function');
    });

    it('should set the class initially, if an initial value has been defined', () => {
        expect(fixture.debugElement.classes['highlighted']).toBeTruthy();
    });

    it('should add the class, when setting the signal\'s value to `true`', () => {
        component.test.set(false);

        fixture.detectChanges();

        expect(fixture.debugElement.classes['test']).toBeFalsy();
    });

    it('should remove the class, when setting the signal\'s value to `false`', () => {
        component.highlighted.set(false);

        fixture.detectChanges();

        expect(fixture.debugElement.classes['highlighted']).toBeFalsy();
    });
});
