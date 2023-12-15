import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeSwitchComponent } from './color-scheme-switch.component';

describe('ColorSchemeSwitchComponent', () => {
    let component: ColorSchemeSwitchComponent;
    let fixture: ComponentFixture<ColorSchemeSwitchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ColorSchemeSwitchComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ColorSchemeSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('colorScheme', () => {
        it('should have the correct default value', () => {
            expect(component.colorScheme.preferred()).toBeNull();
            expect(component.colorScheme.store()).toBeUndefined();
            expect(component.colorScheme.resolved()).toEqual('light');
        });

        it('should be changeable', () => {
            component.colorScheme.store.set('dark');

            expect(component.colorScheme.resolved()).toEqual('dark');
        });

        it('should be bound to the `color-scheme` attribute on the component', () => {
            expect((document.firstElementChild as HTMLElement).getAttribute('color-scheme')).toEqual('light');

            component.colorScheme.store.set('dark');

            fixture.detectChanges();

            expect((document.firstElementChild as HTMLElement).getAttribute('color-scheme')).toEqual('dark');
        });

        it('should store the value in localStorage', () => {
            expect(localStorage.getItem('color-scheme')).toEqual(null);

            component.colorScheme.store.set('dark');
            fixture.detectChanges();

            expect(localStorage.getItem('color-scheme')).toEqual('dark');
        });
    });

    describe('onClick', () => {
        it('should toggle the color scheme', () => {
            expect(component.colorScheme.resolved()).toEqual('light');

            fixture.debugElement.triggerEventHandler('click');
            fixture.detectChanges();

            expect(component.colorScheme.resolved()).toEqual('dark');

            fixture.debugElement.triggerEventHandler('click');
            fixture.detectChanges();

            expect(component.colorScheme.resolved()).toEqual('light');
        });
    });

    it('should display a matching emoji for the current color scheme', () => {
        expect(fixture.debugElement.nativeElement.textContent).toEqual('🌝');

        component.colorScheme.store.set('dark');
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.textContent).toEqual('🌚');
    });
});
