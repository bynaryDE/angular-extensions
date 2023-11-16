import { effect, ElementRef, inject, Renderer2, Signal, signal, WritableSignal } from '@angular/core';

/**
 * A set of options for {@link useClass}
 */
export interface IUseClassOptions {

    /**
     * Whether the class should be added initially. Defaults to `true`
     *
     * @example
     * ```ts
     * const isLoading = useClass('label', { initialValue: false });
     * ```
     *
     * Will not set the class initially
     *
     * ```html
     * <my-component class="loading"></my-component>
     * ```
     */
    initialValue?: boolean;
}

type NormalizedUseClassOptions = Required<IUseClassOptions>;

/**
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 * @internal
 */
const normalizeUseClassOptions = (options?: IUseClassOptions): NormalizedUseClassOptions => ({
    initialValue: options?.initialValue ?? true
});

/**
 * Adds the given class to the host element if set to true.
 *
 * @example
 *
 * ```ts
 * import { useClass } from '@bynary/composables/class';
 *
 * @Component({
 *     selector: 'my-component'
 * })
 * class MyComponent {
 *
 *     isLoading = useClass('loading');
 * }
 * ```
 * ```html
 * <my-component></my-component>
 * ```
 *
 * will result in
 *
 * ```html
 * <my-component class="loading"></my-component>
 * ```
 *
 * @param className - The name of the class to toggle
 * @param options - A set of options
 */
export const useClass = (
    className: string,
    options?: IUseClassOptions
): WritableSignal<boolean> => {
    const { initialValue } = normalizeUseClassOptions(options);
    const value = signal(initialValue);

    return bindClass(className, value);
};

/**
 * Toggles a class on the host element based on the value of a signal. Similar to `useClass`, but accepts a boolean signal as an input instead of creating a new one.
 * Will return the signal that has been passed in.
 *
 * @example
 * ```ts
 * import { bindClass } from '@bynary/composables/class';
 *
 * @Component({
 *     selector: 'my-component'
 * })
 * class MyComponent {
 *
 *     isLoading: Signal<boolean> = signal(false);
 *
 *     constructor() {
 *         bindClass('loading', this.isLoading);
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
 * <my-component class="loading"></my-component>
 * ```
 *
 * @param className - The name of the class to toggle
 * @param value - The signal to determine whether the class should be added or removed. When the signal's value is true, the class will be applied. Else it will be removed.
 */
export const bindClass = <T extends Signal<boolean>>(
    className: string,
    value: T
) => {
    const element = inject(ElementRef).nativeElement;
    const renderer = inject(Renderer2);

    effect(() => {
        const currentValue = value();

        if (currentValue) {
            renderer.addClass(element, className);
        } else {
            renderer.removeClass(element, className);
        }
    });

    return value;
};
