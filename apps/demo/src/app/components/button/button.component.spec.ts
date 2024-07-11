import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonAppearance, ButtonColor, ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    describe('unit', () => {
        let fixture: ComponentFixture<ButtonComponent>;
        let component: ButtonComponent;

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
                expect(component.disabled()).toBe(false);
            });
        });

        describe('the `isLoading` property', () => {
            it('should have the correct initial value', () => {
                expect(component.loading()).toBe(false);
            });

            it('should be changeable', () => {
                fixture.componentRef.setInput('loading', true);

                expect(component.loading()).toBe(true);
            });

            it('should be bound to the `c-button--is-loading` class on the component', () => {
                expect(fixture.debugElement.classes).not.toHaveProperty('c-button--is-loading');

                fixture.componentRef.setInput('loading', true);

                fixture.detectChanges();

                expect(fixture.debugElement.classes).toHaveProperty('c-button--is-loading', true);
            });
        });

        describe('the `appearance` property', () => {
            it('should have the correct initial value', () => {
                expect(component.appearance()).toBe('solid');
            });
        });

        describe('the `color` property', () => {
            it('should have the correct initial value', () => {
                expect(component.color()).toBeUndefined();
            });
        });
    });

    describe('integration', () => {
        @Component({
            standalone: true,
            imports: [ButtonComponent],
            template: `
                <demo-button
                    [disabled]="disabled"
                    [loading]="loading"
                    [appearance]="appearance"
                    [color]="color"
                ></demo-button>
            `
        })
        class TestHostComponent {
            disabled = false;
            loading = false;
            appearance: ButtonAppearance = 'solid';
            color: ButtonColor = 'red';
        }

        let fixture: ComponentFixture<TestHostComponent>;
        let host: TestHostComponent;
        let buttonDebug: DebugElement;
        let button: ButtonComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestHostComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestHostComponent);
            host = fixture.componentInstance;
            buttonDebug = fixture.debugElement.query(By.directive(ButtonComponent));
            button = buttonDebug.componentInstance;

            fixture.detectChanges();
        });

        it('should create', () => {
            expect(host).toBeTruthy();
        });

        describe('the `isDisabled` property', () => {
            it('should have the correct initial value', () => {
                expect(button.disabled()).toBe(false);
            });

            it('should be changeable', () => {
                host.disabled = true;

                expect(button.disabled()).toBe(true);
            });

            it('should be bound to the `disabled` attribute on the component', () => {
                expect(buttonDebug.attributes['disabled']).toBeFalsy();

                host.disabled = true;

                fixture.detectChanges();

                expect(buttonDebug.attributes['disabled']).toEqual('');
            });

            it('should be affect the `tabindex` attribute on the component', () => {
                expect(buttonDebug.attributes['tabindex']).toEqual('0');

                host.disabled = true;

                fixture.detectChanges();

                expect(buttonDebug.attributes['tabindex']).toEqual('-1');
            });
        });

        describe('the `isLoading` property', () => {
            it('should have the correct initial value', () => {
                expect(button.loading()).toBe(false);
            });

            it('should be changeable', () => {
                host.loading = true;

                expect(button.loading()).toBe(true);
            });

            it('should be bound to the `c-button--is-loading` class on the component', () => {
                expect(buttonDebug.classes).not.toHaveProperty('c-button--is-loading');

                host.loading = true;

                fixture.detectChanges();

                expect(buttonDebug.classes).toHaveProperty('c-button--is-loading', true);
            });
        });

        describe('the `appearance` property', () => {
            it('should have the correct initial value', () => {
                expect(button.appearance()).toBe('solid');
            });

            it('should be changeable', () => {
                host.appearance = 'outline';

                expect(button.appearance()).toBe('outline');
            });

            it('should be bound as a modifier class on the component', () => {
                expect(buttonDebug.classes).toHaveProperty('c-button--solid', true);

                host.appearance = 'outline';

                fixture.detectChanges();

                expect(buttonDebug.classes).toHaveProperty('c-button--outline', true);
            });
        });

        describe('the `color` property', () => {
            it('should have the correct initial value', () => {
                expect(button.color()).toBeUndefined();
            });

            it('should be changeable', () => {
                host.color = 'red';

                expect(button.color()).toBe('red');
            });

            it('should be bound as a modifier class on the component', () => {
                host.color = 'red';

                fixture.detectChanges();

                expect(buttonDebug.classes).toHaveProperty('c-button--color-red', true);
            });
        });
    });
});
