import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import MatchMediaMock from 'jest-matchmedia-mock';

import { usePreferredColorScheme } from './color-scheme.composable';

describe('color-scheme.composable.ts', () => {

    let matchMedia: MatchMediaMock;

    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    describe('usePreferredColorScheme', () => {
        @Component({
            template: ''
        })
        class TestComponent {
            preferredColorScheme = usePreferredColorScheme();
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
            expect(typeof usePreferredColorScheme).toEqual('function');
        });

        it('should return the correct color-scheme', () => {
            matchMedia.useMediaQuery('(prefers-color-scheme: light)');

            expect(component.preferredColorScheme()).toEqual('light');
        });

        it('should return the correct color-scheme', () => {
            matchMedia.useMediaQuery('(prefers-color-scheme: dark)');

            expect(component.preferredColorScheme()).toEqual('dark');
        });
    });
});
