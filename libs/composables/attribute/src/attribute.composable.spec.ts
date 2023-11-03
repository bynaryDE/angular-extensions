import { Component, ElementRef, isSignal, Renderer2, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import * as attributeModule from './attribute.composable';
import { bindAttribute, useAttribute } from './attribute.composable';

describe('attribute.composable.ts', () => {
    describe('useAttribute', () => {
        describe('unit', () => {
            let initialAssignedValue: string | null | undefined;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    providers: [
                        {
                            provide: ElementRef,
                            useValue: {
                                nativeElement: {
                                    getAttributeNS: jest
                                        .fn()
                                        .mockReturnValue(initialAssignedValue)
                                }
                            }
                        },
                        { provide: Renderer2, useValue: {} }
                    ]
                });
            });

            it('should be a function', () => {
                expect(typeof useAttribute).toEqual('function');
            });

            it('should call bindAttribute with the correct arguments', () => {
                TestBed.runInInjectionContext(() => {
                    // Arrange
                    const bindAttributeSpy = jest.spyOn(
                        attributeModule,
                        'bindAttribute'
                    );

                    // Act
                    const value = useAttribute('name', {
                        initialValue: 'foo',
                        defaultValue: 'bar',
                        namespace: 'my'
                    });

                    // Assert
                    expect(bindAttributeSpy).toHaveBeenCalledWith(
                        'name',
                        value,
                        { defaultValue: 'bar', namespace: 'my' }
                    );

                    bindAttributeSpy.mockRestore();
                });
            });

            it('should return a writable signal', () => {
                TestBed.runInInjectionContext(() => {
                    // Act
                    const result = useAttribute('name');

                    // Assert
                    expect(isSignal(result)).toBeTruthy();
                    expect(result.set).toBeDefined();
                });
            });

            describe('the signals initial value should be', () => {
                it.each([ 'foo', null ])(
                    'the initialValue, if defined',
                    (value) => {
                        TestBed.runInInjectionContext(() => {
                            // Act
                            const result = useAttribute('name', {
                                initialValue: value
                            });

                            // Assert
                            expect(result()).toEqual('foo');
                        });
                    }
                );

                it.each([ 'bar', null ])(
                    'the initial assigned value in the DOM if no initialValue has been defined',
                    (value) => {
                        TestBed.runInInjectionContext(() => {
                            // Arrange
                            initialAssignedValue = value;

                            // Act
                            const result = useAttribute('name');

                            // Assert
                            expect(result()).toEqual(value);
                        });
                    }
                );

                it('the default value, if neither the initialValue, nor a DOM based value are defined', () => {
                    TestBed.runInInjectionContext(() => {
                        // Act
                        const result = useAttribute('name', {
                            defaultValue: 'baz'
                        });

                        // Assert
                        expect(result()).toEqual('baz');
                    });
                });
            });
        });

        describe('integration', () => {
            @Component({
                // eslint-disable-next-line @angular-eslint/component-selector
                selector: 'button[bxTestButton]',
                template: ''
            })
            class TestButtonComponent {
                readonly type = useAttribute('type', {
                    defaultValue: 'button'
                });
                readonly role = useAttribute('role', {
                    initialValue: 'button'
                });
                readonly label = useAttribute('label', { namespace: 'bx' });
            }

            @Component({
                template: `
                    <button #buttonA bxTestButton role="menuitem"></button>
                    <button #buttonB bxTestButton type="submit"></button>
                `
            })
            class ParentComponent {
                @ViewChild('buttonA')
                readonly buttonA!: TestButtonComponent;

                @ViewChild('buttonB')
                readonly buttonB!: TestButtonComponent;
            }

            let fixture: ComponentFixture<ParentComponent>;
            let component: ParentComponent;

            beforeEach(async () => {
                await TestBed.configureTestingModule({
                    declarations: [ ParentComponent, TestButtonComponent ]
                }).compileComponents();

                fixture = TestBed.createComponent(ParentComponent);
                component = fixture.componentInstance;

                fixture.detectChanges();
            });

            describe('when a default value has been defined', () => {
                it('should not override template supplied value, when no initial value has been defined', () => {
                    expect(component.buttonB.type()).toEqual('submit');
                });

                it('should fall back to default value, when the value is set to `undefined`', () => {
                    // Arrange
                    const buttonADebug = fixture.debugElement.queryAll(
                        By.directive(TestButtonComponent)
                    )[0];

                    // Act
                    component.buttonA.type.set(undefined);
                    fixture.detectChanges();

                    // Assert
                    expect(buttonADebug.attributes['type']).toEqual('button');
                });

                it('should not fall back to default value, when the value is set to `null`', () => {
                    // Arrange
                    const buttonADebug = fixture.debugElement.queryAll(
                        By.directive(TestButtonComponent)
                    )[0];

                    // Act
                    component.buttonA.type.set(null);
                    fixture.detectChanges();

                    // Assert
                    expect(buttonADebug.attributes['type']).not.toBeDefined();
                });
            });

            describe('when an initial value has been defined', () => {
                it('should override template supplied value', () => {
                    expect(component.buttonA.role()).toEqual('button');
                });
            });

            describe('when a namespace has been defined', () => {
                it('should set the attribute with the namespace', () => {
                    // Arrange
                    const buttonADebug = fixture.debugElement.queryAll(
                        By.directive(TestButtonComponent)
                    )[0];

                    // Act
                    component.buttonA.label.set('Button A');
                    fixture.detectChanges();

                    // Assert
                    expect(buttonADebug.attributes['bx:label']).toEqual(
                        'Button A'
                    );
                });
            });
        });
    });

    describe('bindAttribute', () => {
        describe('unit', () => {
            it('should be a function', () => {
                expect(typeof bindAttribute).toEqual('function');
            });

            it('should return the value signal', () => {
                TestBed.configureTestingModule({
                    providers: [
                        {
                            provide: ElementRef,
                            useValue: { nativeElement: {} }
                        },
                        { provide: Renderer2, useValue: {} }
                    ]
                });

                TestBed.runInInjectionContext(() => {
                    // Arrange
                    const value = signal('test');

                    // Act
                    const result = bindAttribute('name', value);

                    // Assert
                    expect(value).toBe(result);
                });
            });
        });

        describe('integration', () => {
            @Component({
                template: ''
            })
            class TestComponent {
                readonly name = signal<string | null | undefined>('test');
                readonly role = signal<string | null | undefined>(undefined);
                readonly myTitle = signal<string | null | undefined>('Hello');

                constructor() {
                    bindAttribute('name', this.name);
                    bindAttribute('role', this.role);
                    bindAttribute('title', this.myTitle, { namespace: 'my' });
                }
            }

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

            it('should set the attribute initially, if an initial value has been defined', () => {
                expect(fixture.debugElement.attributes['name']).toEqual('test');
            });

            it('should not set the attribute initially, if no initial value has been defined', () => {
                expect(fixture.debugElement.attributes['role']).toBeUndefined();
            });

            it('should set a namespaced attribute correctly', () => {
                expect(fixture.debugElement.attributes['my:title']).toEqual(
                    'Hello'
                );
            });

            it.each([ null, undefined ])(
                'should remove the attribute, when setting the signal\'s value to %s',
                (value) => {
                    component.name.set(value);

                    fixture.detectChanges();

                    expect(
                        fixture.debugElement.attributes['name']
                    ).toBeUndefined();
                }
            );

            it('should change the attribute, when the signal\'s value changes', () => {
                component.role.set('button');

                fixture.detectChanges();

                expect(fixture.debugElement.attributes['role']).toEqual(
                    'button'
                );
            });
        });
    });
});
