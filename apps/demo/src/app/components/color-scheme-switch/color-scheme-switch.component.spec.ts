import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorSchemeSwitchComponent } from './color-scheme-switch.component';

describe('ColorSchemeSwitchComponent', () => {
    let component: ColorSchemeSwitchComponent;
    let fixture: ComponentFixture<ColorSchemeSwitchComponent>;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ ColorSchemeSwitchComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(ColorSchemeSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
