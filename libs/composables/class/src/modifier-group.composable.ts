import { computed, inject, Signal, signal } from '@angular/core';

import { addClass } from './utils/class.utils';
import { bindClasses } from './classes.composable';
import { BASE_CLASS } from './provide-base-class';

/**
 * A set of options for {@link bindModifierGroup} and {@link useModifierGroup}
 */
export interface IBindModifierGroupOptions {

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

    /**
     * A prefix to prepend to the modifier class.
     *
     * @example
     * // Without a prefix:
     * useModifierGroup('primary', { baseClass: 'button' })
     * // -> The resulting class will be 'button--primary'
     *
     * // With a prefix:
     * useModifierGroup('primary', { baseClass: 'button', prefix: 'color' })
     * // -> The resulting class will be 'button--color-primary'
     */
    prefix?: string;
}

const normalizeOptions = (options?: IBindModifierGroupOptions) => ({
    baseClass: options?.baseClass ?? inject(BASE_CLASS),
    applyBaseClass: options?.applyBaseClass ?? true,
    prefix: options?.prefix
});

/**
 * Creates a signal that binds its value as a modifier class on the host element.
 *
 * @param initialValue - The initial modifier
 * @param options - A set of {@link IBindModifierGroupOptions options}
 */
export const useModifierGroup = (
    initialValue?: string,
    options?: IBindModifierGroupOptions
) => {
    const modifier = signal<string | null | undefined>(initialValue);

    bindModifierGroup(modifier, options);

    return modifier;
};

/**
 * Binds the value of the given signal to the host element as a modifier class.
 *
 * @param modifier - The signal to bind
 * @param options - A set of {@link IBindModifierGroupOptions options}
 */
export const bindModifierGroup = <T extends Signal<string | null | undefined>>(
    modifier: T,
    options?: IBindModifierGroupOptions
) => {
    const { baseClass, applyBaseClass, prefix } = normalizeOptions(options);

    if (!baseClass) {
        throw new Error('No base class was provided');
    }

    if (applyBaseClass) {
        addClass(baseClass);
    }

    const prefixedModifier = prefix
        ? computed(() => (modifier() ? `${prefix}-${modifier()}` : null))
        : modifier;
    const className = computed(() =>
        prefixedModifier() ? `${baseClass}--${prefixedModifier()}` : null
    );

    bindClasses(className);

    return modifier;
};
