import { inject, Signal, signal, WritableSignal } from '@angular/core';

import { addClass } from './utils/class.utils';
import { bindClass } from './class.composable';
import { BASE_CLASS } from './provide-base-class';

/**
 * A set of options for {@link bindModifier}
 */
export interface IBindModifierOptions {

    /**
     * The base class. There is usually one base class per component.
     *
     * While you're always able to explicitly set a base class via the options, it's recommended to use the {@link provideBaseClass} function to provide the base class to the component.
     * Especially, when using {@link useModifier}/{@link bindModifier} or {@link useModifierGroup}/{@link bindModifierGroup} multiple times in one directive or component.
     *
     * WARNING: If you don't provide a base class either via `options.baseClass` or via `provideBaseClass`, an error will be thrown!
     *
     * @example
     * ```ts
     * const isLoading = signal(false);
     *
     * bindModifier('is-loading', isLoading, { baseClass: 'my-button' }); // <my-component class="my-button"></my-component>
     * ```
     */
    baseClass?: string;

    /**
     * Whether to apply the base class to the host element. Defaults to `true`
     *
     * @example
     * If `true` or not defined, the base class will be applied to the host element, no matter the signal's value:
     *
     * ```ts
     * const isLoading = signal(true);
     *
     * bindModifier('is-loading', isLoading, { baseClass: 'my-component' }); // <my-component class="my-component my-component--is-loading"></my-component>
     * ```
     *
     * @example
     * If `false`, the base class will not be applied to the host element, no matter the signal's value:
     *
     * ```ts
     * const isLoading = signal(true);
     *
     * bindModifier('is-loading', isLoading, { baseClass: 'my-component', applyBaseClass: false }); // <my-component class="my-component--is-loading"></my-component>
     * ```
     */
    applyBaseClass?: boolean;
}

type NormalizedBindModifierOptions = Required<IBindModifierOptions>;

/**
 * Normalizes the given options by applying defaults.
 *
 * @param options - The options to normalize
 * @returns The normalized options
 */
const normalizeBindModifierOptions = (options?: IBindModifierOptions): NormalizedBindModifierOptions => ({
    baseClass: options?.baseClass ?? inject(BASE_CLASS),
    applyBaseClass: options?.applyBaseClass ?? true
});

/**
 * Uses the given signal to add or remove the given modifier class on the host element.
 * A modifier class requires a base class to be set.
 *
 * To learn more about modifier classes, see [BEM](https://getbem.com/naming/#modifier).
 *
 * @example
 * It is recommended to provide the base class via `provideBaseClass`
 *
 * ```ts
 * import { bindModifier } from '@bynary/composables/class';
 *
 * @Component({
 *     selector: 'my-component',
 *     providers: [
 *         provideBaseClass('my-component')
 *     ]
 * })
 * class MyComponent {
 *
 *     isLoading: Signal<boolean> = signal(true);
 *
 *     constructor() {
 *         bindModifier('is-loading', this.isLoading);
 *     }
 * }
 * ```
 *
 * This will output:
 *
 * ```html
 * <my-component class="my-component my-component--is-loading"></my-component>
 * ```
 *
 * @example
 * You can also provide the base class per use via the {@link options IBinModifierOptions}:
 *
 * ```ts
 * import { bindModifier } from '@bynary/composables/class';
 *
 * @Component({
 *     selector: 'my-component'
 * })
 * class MyComponent {
 *
 *     isLoading: Signal<boolean> = signal(true);
 *
 *     constructor() {
 *         bindModifier('is-loading', this.isLoading, { baseClass: 'my-component' });
 *     }
 * }
 * ```
 *
 * This will output:
 *
 * ```html
 * <my-component class="my-component my-component--is-loading"></my-component>
 * ```
 *
 * Setting `isLoading` to `false` will remove the modifier class:
 *
 * ```
 * this.isLoading.set(false); // <my-component class="my-component"></my-component>
 * ```
 *
 *
 * @param modifier - The name of the modifier
 * @param apply - The signal whose value should be bound
 * @param options - A set of {@link IBindModifierOptions options}
 * @returns The passed in signal (`apply` parameter)
 */
export const bindModifier = <T extends Signal<boolean>>(
    modifier: string,
    apply: T,
    options?: IBindModifierOptions
) => {
    const { baseClass, applyBaseClass } = normalizeBindModifierOptions(options);

    if (!baseClass) {
        throw new Error('No base class was provided');
    }

    if (applyBaseClass) {
        addClass(baseClass);
    }

    bindClass(`${baseClass}--${modifier}`, apply);

    return apply;
};

/**
 * A set of options for {@link useModifier}
 */
export interface IUseModifierOptions extends IBindModifierOptions {
    /**
     * Whether the modifier should be applied initially. Defaults to `true`
     *
     * @example
     * When set to `true` or not defined, the modifier will be applied initially:
     *
     * ```ts
     * // with a base class `my-component`
     * const isLoading = useModifier('is-loading', { initialValue: true }); // <my-component class="my-component my-component--is-loading"></my-component>
     * ```
     *
     * @example
     * When set to `false`, the modifier will not be applied initially:
     *
     * ```ts
     * // with a base class `my-component`
     * const isLoading = useModifier('is-loading', { initialValue: false }); // <my-component class="my-component"></my-component>
     * ```
     */
    initialValue?: boolean;
}

type NormalizedUseModifierOptions = Required<IUseModifierOptions>;

/**
 * Normalizes the given options by applying defaults.
 *
 * @param options - The options to normalize
 * @returns The normalized options
 */
const normalizeUseModifierOptions = (options?: IUseModifierOptions): NormalizedUseModifierOptions => ({
    ...normalizeBindModifierOptions(options),
    initialValue: options?.initialValue ?? true
});
/**
 * Creates a signal that allows to toggle the given modifier class on the host element.
 *
 * @param modifier - The name of the modifier
 * @param options - A set of {@link IUseModifierOptions options}
 * @returns A signal that allows to toggle the given modifier class on the host element
 */
export const useModifier = (
    modifier: string,
    options?: IUseModifierOptions
): WritableSignal<boolean> => {
    const normalizedOptions = normalizeUseModifierOptions(options);
    const apply = signal<boolean>(normalizedOptions.initialValue);

    return bindModifier(modifier, apply, options);
};
