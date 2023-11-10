import { Component, DestroyRef, ElementRef, Signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { useEvent } from './event.composable';

class MockEventTarget implements EventTarget {
    readonly listeners = new Set<EventListener>();

    addEventListener(type: string, callback: EventListener) {
        this.listeners.add(callback);
    }

    dispatchEvent(event: Event): boolean {
        this.listeners.forEach(listener => listener(event));
        return true;
    }

    removeEventListener(type: string, callback: EventListener): void {
        this.listeners.delete(callback);
    }
}

describe('useEvent', () => {

    describe('unit', () => {

        let target: MockEventTarget;

        beforeEach(async () => {
            TestBed.configureTestingModule({
                providers: [
                    {
                        provide: ElementRef,
                        useValue: {
                            nativeElement: new MockEventTarget()
                        }
                    },
                    {
                        provide: DestroyRef,
                        useValue: {
                            onDestroy: jest.fn()
                        }
                    }
                ]
            });

            target = TestBed.inject(ElementRef).nativeElement as MockEventTarget;
        });

        it('should be a function', () => {
            expect(typeof useEvent).toEqual('function');
        });

        describe('with no options', () => {
            let click: Signal<Event | undefined>;

            beforeEach(() => {
                TestBed.runInInjectionContext(() => {
                    click = useEvent('click');
                });
            });

            it('should use ElementRef.nativeElement as the target', () => {
                const addEventListenerSpy = jest.spyOn(target, 'addEventListener');

                TestBed.runInInjectionContext(() => useEvent('click'));

                expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
            });

            it('should register a onDestroy callback', () => {
                const destroyRef = jest.mocked(TestBed.inject(DestroyRef));
                const destroyRefSpy = jest.spyOn(destroyRef, 'onDestroy');

                TestBed.runInInjectionContext(() => useEvent('click'));

                expect(destroyRefSpy).toHaveBeenCalledTimes(1);
                expect(destroyRefSpy).toHaveBeenCalledWith(expect.any(Function));
            });

            it('should remove the event listener on destroy', () => {
                const destroyRef = jest.mocked(TestBed.inject(DestroyRef));
                const destroyRefSpy = jest.spyOn(destroyRef, 'onDestroy');
                const removeEventListenerSpy = jest.spyOn(target, 'removeEventListener');

                TestBed.runInInjectionContext(() => useEvent('click'));

                const destroyCallback = destroyRefSpy.mock.calls[0][0] as () => void;

                expect(removeEventListenerSpy).not.toHaveBeenCalled();

                destroyCallback();

                expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
            });

            it('should initially have the value `undefined`', () => {
                expect(click()).toBeUndefined();
            });

            it('should hold the last dispatched event', () => {
                const eventA = new Event('click');
                const eventB = new Event('click');

                target.dispatchEvent(eventA);
                target.dispatchEvent(eventB);

                expect(click()).toBe(eventB);
            });
        });

        describe('with a custom target', () => {
            let customTarget: MockEventTarget;

            beforeEach(() => {
                customTarget = new MockEventTarget();
            });

            it('should use the custom target', () => {
                const customTargetSpy = jest.spyOn(customTarget, 'addEventListener');
                const targetSpy = jest.spyOn(target, 'addEventListener');

                TestBed.runInInjectionContext(() => useEvent('click', customTarget));

                expect(customTargetSpy).toHaveBeenCalledWith('click', expect.any(Function), undefined);
                expect(targetSpy).not.toHaveBeenCalled();
            });

            it('should hold the last event dispatched from the custom target', () => {
                TestBed.runInInjectionContext(() => {
                    const click = useEvent('click', customTarget);
                    const eventA = new Event('click');
                    const eventB = new Event('click');
                    const eventC = new Event('click');

                    customTarget.dispatchEvent(eventA);
                    customTarget.dispatchEvent(eventB);
                    target.dispatchEvent(eventC);

                    expect(click()).toBe(eventB);
                });
            });
        });

        describe('with options', () => {

            it('should pass the options to addEventListener', () => {
                const addEventListenerSpy = jest.spyOn(target, 'addEventListener');
                const options: AddEventListenerOptions = {
                    capture: true,
                    once: true
                }

                TestBed.runInInjectionContext(() => useEvent('click', undefined, options));

                expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), options);
            });
        });
    });

    describe('integration', () => {

        @Component({
            template: ''
        })
        class TestComponent {
            readonly click = useEvent('click');
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

        it('should initially have the value `undefined`', () => {
            expect(component.click()).toBeUndefined();
        });

        it('should hold the latest click event', () => {
            (fixture.debugElement.nativeElement as HTMLElement).click();

            expect(component.click()).toBeInstanceOf(MouseEvent);
        });
    });
});
