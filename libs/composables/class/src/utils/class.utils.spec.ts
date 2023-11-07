import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { addClass, splitClasses } from './class.utils';

describe('class utils', () => {

    describe('splitClasses', () => {

        describe('when the input is not a string', () => {

            it.each([
                [ 'class1', 'class2', 'class3' ],
                null,
                undefined
            ])('should return the input', (input) => {
                const result = splitClasses(input);
                expect(result).toBe(input);
            });
        });

        describe('when the input is a string', () => {

            it('should split the string into an array of classes based on whitespace', () => {
                const result = splitClasses('class1   class2 class3');
                expect(result).toEqual([ 'class1', 'class2', 'class3' ]);
            });

            it('should return an empty array when the string is empty ', () => {
                const result = splitClasses('');
                expect(result).toEqual([]);
            });
        });
    });

    describe('addClass', () => {

        @Component({
            template: ''
        })
        class TestComponent {
            constructor() {
                addClass('test');
            }
        }

        let fixture: ComponentFixture<TestComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [ TestComponent ]
            }).compileComponents();

            fixture = TestBed.createComponent(TestComponent);

            fixture.detectChanges();
        });

        it('should be a function', () => {
            expect(typeof addClass).toEqual('function');
        });

        it('should add the class', () => {
            expect(fixture.debugElement.classes['test']).toBeTruthy();
        });
    });

});
