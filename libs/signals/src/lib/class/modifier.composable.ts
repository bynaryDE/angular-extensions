import { inject, Signal, signal } from '@angular/core';
import { addClass } from './add-class.composable';
import { bindClass } from './class.composable';
import { BASE_CLASS } from './provide-base-class';

export interface IUseModifierOptions {
    baseClass?: string;
    applyBaseClass?: boolean;
    applyInitially?: boolean;
}

export interface IBindModifierOptions {
    baseClass?: string;
    applyBaseClass?: boolean;
}

const normalizeBindModifierOptions = (options?: IBindModifierOptions) => {
    return {
        baseClass: options?.baseClass ?? inject(BASE_CLASS),
        applyBaseClass: options?.applyBaseClass ?? true
    }
}

export const useModifier = (modifier: string, options?: IUseModifierOptions) => {
    const apply = signal<boolean>(options?.applyInitially ?? true);

    bindModifier(modifier, apply, options);

    return apply;
}

export const bindModifier = <T extends Signal<boolean>>(modifier: string, apply: T, options?: IBindModifierOptions) => {
    const { baseClass, applyBaseClass } = normalizeBindModifierOptions(options);

    if (applyBaseClass) {
        addClass(baseClass);
    }

    bindClass(`${baseClass}--${modifier}`, apply);

    return modifier;
}

