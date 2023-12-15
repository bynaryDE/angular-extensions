import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the correct base class', () => {
        expect(fixture.debugElement.classes).toHaveProperty('c-button', true);
    });

    describe('the `type` property', () => {
        it('should have the correct default value', () => {
            expect(component.type()).toEqual('button');
        });

        it('should be changeable', () => {
            component.type.set('submit');

            expect(component.type()).toEqual('submit');
        });

        it('should be bound to the `type` attribute on the component', () => {
            expect(fixture.debugElement.attributes['type']).toEqual('button');
        });
    });

    describe('the `isDisabled` property', () => {
        it('should have the correct initial value', () => {
            expect(component.isDisabled()).toBe(false);
        });

        it('should be changeable', () => {
            component.isDisabled.set(true);

            expect(component.isDisabled()).toBe(true);
        });

        it('should be bound to the `disabled` attribute on the component', () => {
            expect(fixture.debugElement.attributes['disabled']).toBeFalsy();

            component.isDisabled.set(true);

            fixture.detectChanges();

            expect(fixture.debugElement.attributes['disabled']).toEqual('');
        });

        it('should be affect the `tabindex` attribute on the component', () => {
            expect(fixture.debugElement.attributes['tabindex']).toEqual('0');

            component.isDisabled.set(true);

            fixture.detectChanges();

            expect(fixture.debugElement.attributes['tabindex']).toEqual('-1');
        });
    });

    describe('the `isLoading` property', () => {
        it('should have the correct initial value', () => {
            expect(component.isLoading()).toBe(false);
        });

        it('should be changeable', () => {
            component.isLoading.set(true);

            expect(component.isLoading()).toBe(true);
        });

        it('should be bound to the `c-button--is-loading` class on the component', () => {
            expect(fixture.debugElement.classes).not.toHaveProperty('c-button--is-loading');

            component.isLoading.set(true);

            fixture.detectChanges();

            expect(fixture.debugElement.classes).toHaveProperty('c-button--is-loading', true);
        });
    });

    describe('the `appearance` property', () => {
        it('should have the correct initial value', () => {
            expect(component.appearance()).toBe('solid');
        });

        it('should be changeable', () => {
            component.appearance.set('outline');

            expect(component.appearance()).toBe('outline');
        });

        it('should be bound as a modifier class on the component', () => {
            expect(fixture.debugElement.classes).toHaveProperty('c-button--solid', true);

            component.appearance.set('outline');

            fixture.detectChanges();

            expect(fixture.debugElement.classes).toHaveProperty('c-button--outline', true);
        });
    });

    describe('the `color` property', () => {
        it('should have the correct initial value', () => {
            expect(component.color()).toBeUndefined();
        });

        it('should be changeable', () => {
            component.color.set('red');

            expect(component.color()).toBe('red');
        });

        it('should be bound as a modifier class on the component', () => {
            component.color.set('red');

            fixture.detectChanges();

            expect(fixture.debugElement.classes).toHaveProperty('c-button--color-red', true);
        });
    });
});
