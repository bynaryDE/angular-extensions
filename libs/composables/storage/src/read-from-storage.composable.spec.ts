import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFromStorage } from './read-from-storage.composable';

describe('readFromStorage', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be a function', () => {
        expect(typeof readFromStorage).toEqual('function');
    });

    it('should return the value from storage', () => {
        TestBed.runInInjectionContext(() => {
            const value = signal<string | undefined>(undefined);

            localStorage.setItem('test', 'foo');

            readFromStorage('test', value);

            expect(value()).toEqual('foo');
        });
    });

    it('should return the value from storage', () => {
        TestBed.runInInjectionContext(() => {
            const value = signal<string | undefined>(undefined);

            localStorage.setItem('test', 'foo');

            readFromStorage('test', value);

            expect(value()).toEqual('foo');
        });
    });

    it('should reflect the latest value stored', () => {
        TestBed.runInInjectionContext(() => {
            const value = signal<string | undefined>(undefined);

            localStorage.setItem('test', 'foo');

            readFromStorage('test', value);

            localStorage.setItem('test', 'bar');

            expect(value()).toEqual('bar');
        });
    });

    it('should work with a custom storage', () => {
        TestBed.runInInjectionContext(() => {
            const value = signal(undefined);

            sessionStorage.setItem('test', 'foo');

            readFromStorage('test', value, { storage: sessionStorage });

            sessionStorage.setItem('test', 'bar');

            expect(value()).toEqual('bar');
        });
    });
});
