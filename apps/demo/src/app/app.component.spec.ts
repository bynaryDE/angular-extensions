import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ColorSchemeSwitchComponent } from './components/color-scheme-switch/color-scheme-switch.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    describe('counter', () => {
        it('should initially be 0', () => {
            expect(fixture.componentInstance.counter()).toBe(0);
        });

        it('should be incremented by 1 after calling incrementCounter', () => {
            fixture.componentInstance.incrementCounter();

            expect(fixture.componentInstance.counter()).toBe(1);

            fixture.componentInstance.incrementCounter();

            expect(fixture.componentInstance.counter()).toBe(2);
        });
    });

    describe('title', () => {
        it(`should have the correct title`, () => {
            expect(fixture.componentInstance.title()).toEqual('@bynary/composables');
        });

        it('should render the title inside a h1', () => {
            const h1 = fixture.debugElement.query(By.css('h1'));

            expect(h1.nativeElement.textContent).toContain('@bynary/composables');
        });

        it('should bind the title to the document', () => {
            expect(document.title).toContain('@bynary/composables');
        });

        it('should include the click counter after the first click', () => {
            fixture.componentInstance.incrementCounter();

            expect(fixture.componentInstance.title()).toEqual('@bynary/composables - Clicks: 1');
        });
    });

    it('should render the color-scheme-switch component', () => {
        const predicate = By.directive(ColorSchemeSwitchComponent);
        const colorSwitch = fixture.debugElement.query(predicate);

        expect(colorSwitch).toBeTruthy();
    });
});
