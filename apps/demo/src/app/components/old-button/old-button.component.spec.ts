import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OldButtonComponent } from './old-button.component';

describe('OldButtonComponent', () => {
    let component: OldButtonComponent;
    let fixture: ComponentFixture<OldButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OldButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OldButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
