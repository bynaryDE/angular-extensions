import { effect, ElementRef, inject, Renderer2, Signal, signal, WritableSignal } from '@angular/core';
import { splitClasses } from './utils/class.utils';

export type ClassList = string | string[];

/**
 * Creates a signal that binds its value as a set of classes on the host element.
 *
 * @example Default usage
 * ```ts
 * import { useClasses } from '@bynary/composables/class';
 *
 * @Component({
 *     selector: 'my-component'
 * })
 * class MyComponent {
 *
 *     classes = useClasses(['my-component', 'primary', 'focusable']);
 * }
 * ```
 * ```html
 * <my-component #myComponent></my-component>
 * ```
 *
 * will result in
 *
 * ```html
 * <my-component class="my-component primary focusable"></my-component>
 * ```
 *
 * @example String input
 * You may also pass a string as the initial value. The string will be split by spaces and each part will be added as a class.
 * Multiple spaces will be ignored.
 *
 * ```ts
 * const classes = useClasses('my-component primary    focusable');
 * ```
 *
 * @example Programmatically set the value
 *
 * By changing the value of the signal, you can add / remove classes programmatically.
 * Each previously set class will be removed and the new classes will be added.
 * Classes set form somewhere else (e.g. the template) will be untouched, except for ones that are contained in new or previous list.
 *
 * ```ts
 * import { useClasses } from '@bynary/composables/class';
 *
 * @Component({
 *     selector: 'my-component',
 *     host: {
 *         class: 'my-component'
 *     }
 * })
 * class MyComponent {
 *
 *     classes = useClasses('primary focusable'); // <my-component class="my-component primary focusable"></my-component>
 *
 *     changeClasses() {
 *         this.classes.set('accent'); // <my-component class="my-component accent"></my-component>
 *     }
 * }
 * ```
 *
 * @param initialValue - The initial value of the signal
 */
export const useClasses = (initialValue: ClassList = []): WritableSignal<string | string[]> => {
    const value = signal(initialValue);

    return bindClasses(value);
};

/**
 * Binds a set of class to the host element based on the value of a signal. Similar to `useClasses`, but accepts a signal as an input instead of creating a new one.
 * Will return the signal that has been passed in.
 *
 * @example
 * ```ts
 * import { bindClasses } from '@bynary/composables/class';
 *
 * @Component({
 *     selector: 'my-component'
 * })
 * class MyComponent {
 *
 *     classes = signal([ 'foo', 'bar' ]);
 *
 *     constructor() {
 *         bindClasses(this.classes);
 *     }
 * }
 * ```
 * ```html
 * <my-component></my-component>
 * ```
 *
 * will result in
 *
 * ```html
 * <my-component class="my-component primary focusable"></my-component>
 * ```
 *
 * @example
 * When the signals value changes, the previous classes will be removed.
 * ```ts
 * const classes = signal([ 'foo', 'bar' ]);
 *
 * bindClasses(classes); // <my-component class="foo bar"></my-component>
 * classes.set([ 'baz' ]); // <my-component class="baz"></my-component>
 * ```
 *
 * @example
 * This method can also be used multiple times to bind different sets of classes to the same element.
 * Each use of `bindClasses` will handle the addition & removal of classes on its own, allowing to toggle between different sets of classes.
 *
 * ```ts
 * const classesA = signal([ 'foo', 'bar' ]);
 * const classesB = signal([ 'x', 'y' ]);
 *
 * bindClasses(classesA); // <my-component class="foo bar"></my-component>
 * bindClasses(classesB); // <my-component class="foo bar x y"></my-component>
 *
 * classesA.set([ 'baz' ]); // <my-component class="baz x y"></my-component>
 * classesB.set([ 'a', 'b' ]); // <my-component class="baz a b"></my-component>
 * ```
 *
 * @param value - The signal whose value should be bound
 */
export const bindClasses = <T extends Signal<ClassList | null>>(
    value: T
) => {
    const element = inject(ElementRef).nativeElement;
    const renderer = inject(Renderer2);

    effect((onCleanup) => {
        const currentClasses = splitClasses(value());

        if (!currentClasses?.length) {
            return;
        }

        for (const clazz of currentClasses) {
            renderer.addClass(element, clazz);
        }

        onCleanup(() => {
            for (const clazz of currentClasses) {
                renderer.removeClass(element, clazz);
            }
        });
    }, {});

    return value;
};
