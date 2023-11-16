import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { useBooleanAttribute } from './boolean-attribute.composable';

@Component({
    template: ''
})
class TestComponent {
    readonly disabled = useBooleanAttribute('disabled');
    readonly loading = useBooleanAttribute('loading', { initialValue: true });
    readonly editable = useBooleanAttribute('editable', {
        namespace: 'my',
        initialValue: false
    });
    readonly isDark = useBooleanAttribute('dark', { initialValue: true, target: document.body });
}

describe('useBooleanAttribute', () => {
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

    it('should be a function', () => {
        expect(typeof useBooleanAttribute).toEqual('function');
    });

    it('should set the attribute initially, if the initial value is `true`', () => {
        expect(fixture.debugElement.attributes['loading']).toEqual('');
    });

    it('should not set the attribute initially, if no initial value has been defined', () => {
        expect(fixture.debugElement.attributes['disabled']).toBeUndefined();
    });

    it('should set a namespaced attribute correctly', () => {
        component.editable.set(true);

        fixture.detectChanges();

        expect(fixture.debugElement.attributes['my:editable']).toEqual('');
    });

    it('should remove the attribute, when setting the signal\'s value to `false`', () => {
        component.loading.set(false);

        fixture.detectChanges();

        expect(fixture.debugElement.attributes['loading']).toBeUndefined();
    });

    it('should set the attribute, when setting the signal\'s value to `true`', () => {
        component.disabled.set(true);

        fixture.detectChanges();

        expect(fixture.debugElement.attributes['disabled']).toEqual('');
    });

    it('should bind the attribute to a custom target if defined', () => {
        expect(document.body.getAttribute('dark')).toEqual('');
    });
});
