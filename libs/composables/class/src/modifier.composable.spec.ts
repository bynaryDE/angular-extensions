/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { useModifier } from './modifier.composable';
import { provideBaseClass } from './provide-base-class';

@Component({
    template: '',
    providers: [ provideBaseClass('c-test') ]
})
class TestComponent {
    readonly disabled = useModifier('disabled', { applyInitially: false });
    readonly loading = useModifier('loading');
}

describe('useModifier', () => {
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
        expect(typeof useModifier).toEqual('function');
    });

    it('should set the attribute initially, if the initial value is `true`', () => {
        expect(fixture.debugElement.classes).toEqual({
            'c-test': true,
            'c-test--loading': true
        });
    });

    it('should remove the attribute, when setting the signal\'s value to `false`', () => {
        component.loading.set(false);

        fixture.detectChanges();

        expect(fixture.debugElement.classes).toEqual({
            'c-test': true
        });
    });

    it('should set the attribute, when setting the signal\'s value to `true`', () => {
        component.disabled.set(true);

        fixture.detectChanges();

        expect(fixture.debugElement.classes).toEqual({
            'c-test': true,
            'c-test--disabled': true,
            'c-test--loading': true
        });
    });
});
