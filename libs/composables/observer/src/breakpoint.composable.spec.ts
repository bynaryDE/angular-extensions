import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, map } from 'rxjs';

import { useBreakpoint } from './breakpoint.composable';

@Component({
    template: ''
})
class TestComponent {
    readonly isMobile = useBreakpoint('(max-width: 600px)');
}

describe('useBreakpoint', () => {
    let isMatchedSubject: BehaviorSubject<boolean>;
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
        isMatchedSubject = new BehaviorSubject(true);

        await TestBed.configureTestingModule({
            declarations: [ TestComponent ],
            providers: [
                {
                    provide: BreakpointObserver,
                    useValue: {
                        isMatched: jest
                            .fn()
                            .mockImplementation(() => isMatchedSubject.value),
                        observe: jest
                            .fn()
                            .mockReturnValue(
                                isMatchedSubject.pipe(
                                    map((matches) => ({ matches }))
                                )
                            )
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be a function', () => {
        expect(typeof useBreakpoint).toEqual('function');
    });

    it('should set the initial value correctly', () => {
        expect(component.isMobile()).toBeTruthy();
    });

    it('should use `observe` to track whether the breakpoint matches', () => {
        const breakpointObserver = TestBed.inject(BreakpointObserver);
        const observeSpy = jest.spyOn(breakpointObserver, 'observe');

        component.isMobile();

        expect(observeSpy).toHaveBeenCalledTimes(1);
        expect(observeSpy).toHaveBeenCalledWith('(max-width: 600px)');
    });

    it('should emit changing values correctly', () => {
        isMatchedSubject.next(false);

        expect(component.isMobile()).toBeFalsy();
    });
});
