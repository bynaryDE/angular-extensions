import { effect, ElementRef, inject, Renderer2, Signal, signal, WritableSignal } from '@angular/core';
import { splitClasses } from './utils/class.utils';

export type ClassList = string | string[];

/**
 * Creates a signal that binds its value as a set of classes on the host element.
 *
 * @param initialValue - The initial value of the signal
 */
export const useClasses = (initialValue: ClassList = []): WritableSignal<string | string[]> => {
    const value = signal(initialValue);

    return bindClasses(value);
};

/**
 * Binds the value of the given signal as a set of classes on the host element.
 *
 * @param value - The signal whose value should be bound
 */
export const bindClasses = <T extends Signal<ClassList | null>>(
    value: T
) => {
    const element = inject(ElementRef).nativeElement;
    const renderer = inject(Renderer2);

    effect((onCleanup) => {
        const currentClasses = splitClasses(value());

        if (!currentClasses?.length) {
            return;
        }

        for (const clazz of currentClasses) {
            renderer.addClass(element, clazz);
        }

        onCleanup(() => {
            for (const clazz of currentClasses) {
                renderer.removeClass(element, clazz);
            }
        });
    }, {});

    return value;
};
