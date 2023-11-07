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
     * While you're always able to explicitly set a base class vie the options, it's recommended to use the {@link provideBaseClass} function to provide the base class to the component.
     * Especially, when using {@link useModifier} or {@link useModifierGroup} multiple times in one directive or component.
     *
     * WARNING: If you don't provide a base class either via `options.baseClass` or via `provideBaseClass`, an error will be thrown!
     */
    baseClass?: string;

    /**
     * Whether to apply the base class to the host element.
     */
    applyBaseClass?: boolean;
}

/**
 * A set of options for {@link useModifier}
 */
export interface IUseModifierOptions extends IBindModifierOptions {
    /**
     * Whether the modifier should be applied initially.
     */
    applyInitially?: boolean;
}

/**
 * Normalizes the given options by applying defaults.
 *
 * @param options - The options to normalize
 */
const normalizeBindModifierOptions = (options?: IBindModifierOptions) => ({
    baseClass: options?.baseClass ?? inject(BASE_CLASS),
    applyBaseClass: options?.applyBaseClass ?? true
});

/**
 * Creates a signal that allows to toggle the given modifier class on the host element.
 *
 * @param modifier - The name of the modifier
 * @param options - A set of {@link IUseModifierOptions options}
 */
export const useModifier = (
    modifier: string,
    options?: IUseModifierOptions
): WritableSignal<boolean> => {
    const apply = signal<boolean>(options?.applyInitially ?? true);

    return bindModifier(modifier, apply, options);
};

/**
 * Uses the given signal to add or remove the given modifier class on the host element.
 *
 * @param modifier - The name of the modifier
 * @param apply - The signal whose value should be bound
 * @param options - A set of {@link IBindModifierOptions options}
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
