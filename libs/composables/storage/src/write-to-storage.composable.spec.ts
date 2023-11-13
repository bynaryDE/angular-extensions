import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { writeToStorage } from './write-to-storage.composable';

describe('writeToStorage', () => {

    @Component({
        template: ''
    })
    class TestComponent {
        value = signal<string | null | undefined>('foo');
        sessionValue = signal<string | null | undefined>('foo');

        constructor() {
            writeToStorage('test', this.value);
            writeToStorage('sessionTest', this.sessionValue, { storage: sessionStorage });
        }
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

    it('should be a function', () => {
        expect(typeof writeToStorage).toEqual('function');
    });

    it('should write the value to localStorage by default', () => {
        expect(localStorage.getItem('test')).toEqual('foo');
    });

    it('should update the value in storage when the signal value changed', () => {
        component.value.set('bar');

        fixture.detectChanges();

        expect(localStorage.getItem('test')).toEqual('bar');
    });

    it.each([
        null,
        undefined
    ])('should remove the value from storage, if it is nil', (nextValue) => {
        component.value.set(nextValue);

        fixture.detectChanges();

        expect(localStorage.getItem('test')).toBeNull();
    });

    it('should use the storage provided in the options', () => {
        expect(sessionStorage.getItem('sessionTest')).toEqual('foo');

        component.sessionValue.set('bar');

        fixture.detectChanges();

        expect(sessionStorage.getItem('sessionTest')).toEqual('bar');
    });
});
