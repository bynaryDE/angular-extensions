import { Component, isSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { useStorage } from './use-storage.composable';
import * as bindStorageModule from './bind-storage.composable';

describe('useStorage', () => {

    it('should be a function', () => {
        expect(typeof useStorage).toEqual('function');
    });

    it('should return the value signal', () => {
        TestBed.runInInjectionContext(() => {
            const actual = useStorage('test');

            expect(isSignal(actual)).toBeTruthy();
        });
    });

    it('should use bindStorage', () => {
        TestBed.runInInjectionContext(() => {
            const bindStorageSpy = jest.spyOn(bindStorageModule, 'bindStorage');
            const key = 'test';
            const options = { storage: sessionStorage };

            const actual = useStorage(key, options);

            expect(bindStorageSpy).toHaveBeenCalledTimes(1);
            expect(bindStorageSpy).toHaveBeenCalledWith(key, actual, options);
        });
    });

    describe('integration', () => {

        @Component({
            template: ''
        })
        class TestComponent {
            value = useStorage('test', { storage: sessionStorage });
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
            expect(sessionStorage.getItem('test')).toEqual(null);

            component.value.set('bar');

            fixture.detectChanges();

            expect(sessionStorage.getItem('test')).toEqual('bar');

            sessionStorage.setItem('test', 'baz');

            fixture.detectChanges();
        });
    });
});
