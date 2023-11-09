import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ AppComponent, RouterTestingModule ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    it('should render title', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('h1')?.textContent).toContain('@bynary/composables');
    });

    it(`should have as title 'demo'`, () => {
        expect(fixture.componentInstance.title()).toEqual('@bynary/composables');
    });
});
