import { computed, inject, Signal, signal } from '@angular/core';

import { addClass } from './add-class';
import { bindClasses } from './classes.composable';
import { BASE_CLASS } from './provide-base-class';

export interface IUseModifierGroupOptions {
    baseClass?: string;
    applyBaseClass?: boolean;
    prefix?: string;
}

const normalizeOptions = (options?: IUseModifierGroupOptions) => ({
    baseClass: options?.baseClass ?? inject(BASE_CLASS),
    applyBaseClass: options?.applyBaseClass ?? true,
    prefix: options?.prefix
});

export const useModifierGroup = (
    initialValue?: string,
    options?: IUseModifierGroupOptions
) => {
    const modifier = signal<string | null | undefined>(initialValue);

    bindModifierGroup(modifier, options);

    return modifier;
};
export const bindModifierGroup = <T extends Signal<string | null | undefined>>(
    modifier: T,
    options?: IUseModifierGroupOptions
) => {
    const { baseClass, applyBaseClass, prefix } = normalizeOptions(options);

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
