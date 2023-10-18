import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { useAttribute } from './attribute.composable';

@Component({
    template: ''
})
class TestComponent {
    readonly name = useAttribute('name', { initialValue: 'test' });
    readonly role = useAttribute('role');
    readonly myTitle = useAttribute('title', { initialValue: 'Hello', namespace: 'my' });
}

describe('useAttribute', () => {

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
        expect(typeof useAttribute).toEqual('function');
    });

    it('should set the attribute initially, if an initial value has been defined', () => {
        expect(fixture.debugElement.attributes['name']).toEqual('test');
    });

    it('should not set the attribute initially, if no initial value has been defined', () => {
        expect(fixture.debugElement.attributes['role']).toBeUndefined();
    });

    it('should set a namespaced attribute correctly', () => {
        expect(fixture.debugElement.attributes['my:title']).toEqual('Hello');
    });

    it.each([
        null,
        undefined
    ])('should remove the attribute, when setting the signal\'s value to %s', (value) => {
        component.name.set(value);

        fixture.detectChanges();

        expect(fixture.debugElement.attributes['name']).toBeUndefined();
    });

    it('should change the attribute, when the signal\'s value changes', () => {
        component.role.set('button');

        fixture.detectChanges();

        expect(fixture.debugElement.attributes['role']).toEqual('button');
    });

});
