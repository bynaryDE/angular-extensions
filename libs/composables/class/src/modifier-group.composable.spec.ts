/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { useModifierGroup } from './modifier-group.composable';
import { provideBaseClass } from './provide-base-class';

@Component({
    template: '',
    providers: [ provideBaseClass('c-test') ]
})
class TestComponent {
    readonly color = useModifierGroup('primary');
    readonly appearance = useModifierGroup(undefined);
}

describe('useModifierGroup', () => {
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
        expect(typeof useModifierGroup).toEqual('function');
    });

    it('should set the class initially, if an initial value has been defined', () => {
        expect(fixture.debugElement.classes).toEqual({
            'c-test': true,
            'c-test--primary': true
        });
    });

    it('should set the class initially, if an initial value has been defined', () => {
        expect(fixture.debugElement.classes).toEqual({
            'c-test': true,
            'c-test--primary': true
        });
    });

    it('should remove the previous modifier class and add a new modifier class, when changing the signal\'s value', () => {
        component.color.set('secondary');

        fixture.detectChanges();

        expect(fixture.debugElement.classes).toEqual({
            'c-test': true,
            'c-test--secondary': true
        });
    });

    it.each([ null, undefined ])(
        'should remove the previous modifier class the signal\'s value is set to %s',
        (value) => {
            component.color.set(value);

            fixture.detectChanges();

            expect(fixture.debugElement.classes).toEqual({
                'c-test': true
            });
        }
    );
});
