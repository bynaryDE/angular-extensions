import { effect, ElementRef, inject, Renderer2, Signal, signal, WritableSignal } from '@angular/core';


/**
 * A set of options for {@link useClass}
 */
export interface IUseClassOptions {
    initialValue?: boolean;
}

/**
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 */
const normalizeUseClassOptions = (options?: IUseClassOptions) => {
    return {
        initialValue: options?.initialValue ?? false
    };
}

export const useClass = (clazz: string, options?: IUseClassOptions): WritableSignal<boolean> => {
    const { initialValue } = normalizeUseClassOptions(options);
    const value = signal(initialValue);

    return bindClass(clazz, value);
}

export const bindClass = <T extends Signal<boolean>>(clazz: string, value: T) => {
    const element = inject(ElementRef).nativeElement;
    const renderer = inject(Renderer2);

    effect(() => {
        const currentValue = value();

        if (currentValue) {
            renderer.addClass(element, clazz);
        } else {
            renderer.removeClass(element, clazz);
        }
    });

    return value;
}
