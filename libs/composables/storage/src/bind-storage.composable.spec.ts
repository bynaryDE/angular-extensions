import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { bindStorage, IBindStorageOptions } from './bind-storage.composable';
import * as readFromStorageModule from './read-from-storage.composable';
import * as writeToStorageModule from './write-to-storage.composable';


describe('bindStorage', () => {

    it('should be a function', () => {
        expect(typeof bindStorage).toEqual('function');
    });

    it('should return the value signal', () => {
        TestBed.runInInjectionContext(() => {
            const value = signal('foo');

            const actual = bindStorage('test', value);

            expect(actual).toBe(value);
        });
    });

    it('should use writeToStorage and readFromStorage', () => {
        TestBed.runInInjectionContext(() => {
            const readFromStorageSpy = jest.spyOn(readFromStorageModule, 'readFromStorage');
            const writeToStorageSpy = jest.spyOn(writeToStorageModule, 'writeToStorage');
            const key = 'test';
            const value = signal('foo');
            const options = { storage: sessionStorage };

            bindStorage(key, value, options);

            expect(readFromStorageSpy).toHaveBeenCalledTimes(1);
            expect(readFromStorageSpy).toHaveBeenCalledWith(key, value, options);

            expect(writeToStorageSpy).toHaveBeenCalledTimes(1);
            expect(writeToStorageSpy).toHaveBeenCalledWith(key, value, options);
        });
    });

    describe('integration', () => {

        @Component({
            template: ''
        })
        class TestComponent {
            value = signal<string | null | undefined>('foo');
            readonly options: IBindStorageOptions = { storage: sessionStorage, skipInitialRead: true };

            constructor() {
                bindStorage('test', this.value, this.options);
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

        it('should sync the value with storage', () => {
            expect(sessionStorage.getItem('test')).toEqual('foo');

            component.value.set('bar');

            fixture.detectChanges();

            expect(sessionStorage.getItem('test')).toEqual('bar');

            sessionStorage.setItem('test', 'baz');

            fixture.detectChanges();
        });
    });
});
