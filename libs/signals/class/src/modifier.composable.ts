import { inject, Signal, signal, WritableSignal } from '@angular/core';
import { addClass } from './add-class';
import { bindClass } from './class.composable';
import { BASE_CLASS } from './provide-base-class';

/**
 * A set of options for {@link bindModifier}
 */
export interface IBindModifierOptions {

    /**
     * The base class to use for the modifier.
     *
     * This can also be supplied via {@link provideBaseClass}
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
const normalizeBindModifierOptions = (options?: IBindModifierOptions) => {
    return {
        baseClass: options?.baseClass ?? inject(BASE_CLASS),
        applyBaseClass: options?.applyBaseClass ?? true
    }
}

/**
 * Creates a signal that binds its value as a modifier class on the host element.
 *
 * @param modifier - The name of the modifier
 * @param options - A set of {@link IUseModifierOptions options}
 */
export const useModifier = (modifier: string, options?: IUseModifierOptions): WritableSignal<boolean> => {
    const apply = signal<boolean>(options?.applyInitially ?? true);

    return bindModifier(modifier, apply, options)
}

/**
 * Binds the given signal as a modifier class on the host element.
 *
 * @param modifier - The name of the modifier
 * @param apply - The signal whose value should be bound
 * @param options - A set of {@link IBindModifierOptions options}
 */
export const bindModifier = <T extends Signal<boolean>>(modifier: string, apply: T, options?: IBindModifierOptions) => {
    const { baseClass, applyBaseClass } = normalizeBindModifierOptions(options);

    if (applyBaseClass) {
        addClass(baseClass);
    }

    bindClass(`${baseClass}--${modifier}`, apply);

    return apply;
}

