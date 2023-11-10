import { TestBed } from '@angular/core/testing';
import MatchMediaMock from 'jest-matchmedia-mock';
import { useMediaQuery } from './media-query.composable';


describe('useMediaQuery', () => {
    const matchMedia = new MatchMediaMock();

    afterEach(() => {
        matchMedia.clear();
    });

    it('should return true if the media query matches', () => {
        TestBed.runInInjectionContext(() => {
            matchMedia.useMediaQuery('(prefers-color-scheme: dark)');

            const matches = useMediaQuery('(prefers-color-scheme: dark)');

            expect(matches()).toBe(true);
        });
    });

    it('should return false if the media query does not match', () => {
        TestBed.runInInjectionContext(() => {
            matchMedia.useMediaQuery('(prefers-color-scheme: light)');

            const matches = useMediaQuery('(prefers-color-scheme: dark)');

            expect(matches()).toBe(false);
        });
    });

    it('should reflect the latest match', () => {
        TestBed.runInInjectionContext(() => {
            matchMedia.useMediaQuery('(prefers-color-scheme: light)');

            const matches = useMediaQuery('(prefers-color-scheme: dark)');

            matchMedia.useMediaQuery('(prefers-color-scheme: dark)');

            expect(matches()).toBe(true);
        });
    });
});
