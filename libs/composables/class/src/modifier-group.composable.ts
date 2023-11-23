import { computed, inject, Signal, signal } from '@angular/core';

import { addClass } from './utils/class.utils';
import { bindClasses } from './classes.composable';
import { BASE_CLASS } from './provide-base-class';

/**
 * A set of options for {@link bindModifierGroup} and {@link useModifierGroup}
 */
export interface IBindModifierGroupOptions {
    /**
     * The base CSS class used to create a modifier-class. There is usually one base class per component: `<base-class>--<modifier>`
     *
     * While you're always able to explicitly set a base class via the options, it's recommended to use the {@link provideBaseClass} function to provide the base class to the component.
     * Especially, when using {@link useModifier} or {@link useModifierGroup} multiple times in one directive or component.
     *
     * WARNING: If you don't provide a base class either via `options.baseClass` or via {@link provideBaseClass}, an error will be thrown!
     *
     * @example
     * ```ts
     * const color = signal('red');
     *
     * bindModifierGroup(color, { baseClass: 'my-button' }); // <my-component class="my-button my-button--red"></my-component>
     * ```
     */
    baseClass?: string;

    /**
     * A prefix to prepend to the modifier when creating the modifier class: `<base-class>--<prefix>-<modifier>`
     *
     * @example
     * Without a prefix:
     *
     * ```ts
     * useModifierGroup('primary', { baseClass: 'button' }); // <my-component class="button button--primary"></my-component>
     * ```
     *
     * @example
     * With a prefix:
     *
     * ```ts
     * useModifierGroup('primary', { baseClass: 'button', prefix: 'color' }); // <my-component class="button button--color-primary"></my-component>
     * ```
     */
    prefix?: string;
}

/**
 * @internal
 * Normalizes the given options by applying defaults.
 *
 * @param options - The options to normalize
 * @returns The normalized options
 */
const normalizeOptions = (options?: IBindModifierGroupOptions) => ({
    baseClass: options?.baseClass ?? inject(BASE_CLASS),
    prefix: options?.prefix
});

/**
 * Binds the value of the given signal to the host element as a modifier class.
 *
 * @example
 * ```ts
 * import { bindModifierGroup } from '@bynary/composables/class';
 *
 * @Component({
 *     selector: 'my-component',
 *     providers: [
 *         provideBaseClass('my-component')
 *     ]
 * })
 * class MyComponent {
 *
 *     color = signal('red');
 *
 *     constructor() {
 *         bindModifierGroup(this.color);
 *     }
 * }
 * ```
 *
 * This will output:
 *
 * ```html
 * <my-component class="my-component my-component--red"></my-component>
 * ```
 *
 * A change of color will change the corresponding modifier class:
 *
 * ```ts
 * color.set('blue'); // <my-component class="my-component my-component--blue"></my-component>
 * ```
 *
 *
 * @param modifier - The signal to bind
 * @param options - A set of {@link IBindModifierGroupOptions options}
 * @returns The passed in signal (`modifier` parameter)
 * @throws Error - If no base class was provided via `options.baseClass` or via `provideBaseClass`
 */
export const bindModifierGroup = <Modifier extends string | null | undefined, T extends Signal<Modifier>>(
    modifier: T,
    options?: IBindModifierGroupOptions
) => {
    const { baseClass, prefix } = normalizeOptions(options);

    if (!baseClass) {
        throw new Error('No base class was provided');
    }

    addClass(baseClass);

    const prefixedModifier = prefix ? computed(() => (modifier() ? `${prefix}-${modifier()}` : null)) : modifier;
    const className = computed(() => (prefixedModifier() ? `${baseClass}--${prefixedModifier()}` : null));

    bindClasses(className);

    return modifier;
};

/**
 * Creates a signal that binds its value as a modifier class on the host element.
 *
 * @example
 *
 * ```ts
 * import { useModifierGroup } from '@bynary/composables/class';
 *
 * @Component({
 *     selector: 'my-component',
 *     providers: [
 *         provideBaseClass('my-component')
 *     ]
 * })
 * class MyComponent {
 *
 *     color = useModifierGroup('red');
 * }
 * ```
 *
 * This will output:
 *
 * ```html
 * <my-component class="my-component my-component--red"></my-component>
 * ```
 *
 * a change of color will change the corresponding modifier class:
 *
 * ```ts
 * color.set('blue'); // <my-component class="my-component my-component--blue"></my-component>
 * ```
 *
 * @param initialValue - The initial modifier
 * @param options - A set of {@link IBindModifierGroupOptions options}
 * @returns A signal that binds its value as a modifier class on the host element
 * @throws Error - If no base class was provided via `options.baseClass` or via `provideBaseClass`
 */
export const useModifierGroup = <Modifier extends string | null | undefined>(
    initialValue: Modifier,
    options?: IBindModifierGroupOptions
) => {
    const modifier = signal(initialValue);

    bindModifierGroup(modifier, options);

    return modifier;
};
