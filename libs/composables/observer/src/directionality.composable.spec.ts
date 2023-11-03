import { Direction, Directionality } from '@angular/cdk/bidi';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { useDirectionality } from './directionality.composable';

@Component({
    template: ''
})
class TestComponent {
    readonly direction = useDirectionality();
}

describe('useDirectionality', () => {
    let directionSubject: BehaviorSubject<Direction>;
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
        directionSubject = new BehaviorSubject<Direction>('ltr');

        await TestBed.configureTestingModule({
            declarations: [ TestComponent ],
            providers: [
                {
                    provide: Directionality,
                    useValue: {
                        value: directionSubject.value,
                        change: directionSubject
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be a function', () => {
        expect(typeof useDirectionality).toEqual('function');
    });

    it('should set the initial value correctly', () => {
        expect(component.direction()).toEqual('ltr');
    });

    it('should emit changing values correctly', () => {
        directionSubject.next('rtl');

        expect(component.direction()).toEqual('rtl');
    });
});
