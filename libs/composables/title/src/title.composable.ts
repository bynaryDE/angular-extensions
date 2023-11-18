import { effect, inject, Signal, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * Binds the value of the signal to the title of the page.
 *
 * @example
 * ```ts
 * @Component({
 *    selector: 'my-component',
 *    template: ''
 * })
 * class MyComponent {
 *     name = signal('Jane');
 *
 *     constructor() {
 *         bindTitle(computed(() => `Hello ${this.name()}`));
 *     }
 * }
 * ```
 *
 * @param value - The signal to bind to the title.
 */
export const bindTitle = <T extends Signal<string>>(value: T): T => {
    const title = inject(Title);

    effect(() => {
        title.setTitle(value());
    });

    return value;
};

/**
 * A signal to change the title of the page.
 *
 * @example
 * ```ts
 * @Component({
 *    selector: 'my-component',
 *    template: ''
 * })
 * class MyComponent {
 *     title = useTitle('Hello World'); // The title of the page is now 'Hello World'
 *
 *     greetUser(name: string) {
 *         this.title.set(`Hello ${name}`); // For a name 'Jane', the title of the page is now 'Hello Jane'
 *     }
 * }
 * ```
 *
 * @example
 * Reading the current title of the page
 *
 * ```ts
 * @Component({
 *    selector: 'my-component',
 *    template: ''
 * })
 * class MyComponent {
 *     title = useTitle(); // The initial value of the signal is the current title of the page
 * }
 * ```
 *
 * @param initialValue - The initial title of the page. Defaults to the current title of the page.
 */
export const useTitle = (initialValue?: string) => {
    const title = inject(Title);
    const value = signal(initialValue ?? title.getTitle());

    return bindTitle(value);
};
