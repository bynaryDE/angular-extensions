import { effect, ElementRef, inject, Renderer2, Signal, signal } from '@angular/core';

const CLASS_SEPARATOR_REGEX = /\s+/;
const splitClasses = (classes: string | string[] | null | undefined) => typeof classes === 'string' ? classes.split(CLASS_SEPARATOR_REGEX) : classes;

export const useClasses = (initialValue: string | string[] = []) => {
    const value = signal(initialValue);

    bindClasses(value);

    return value;
}

export const bindClasses = <T extends Signal<string | string[] | null>>(value: T) => {
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
}
