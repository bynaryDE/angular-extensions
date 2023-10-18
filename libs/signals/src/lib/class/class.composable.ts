import { effect, ElementRef, inject, Renderer2, Signal, signal } from '@angular/core';

export const useClass = (clazz: string, initialValue = true) => {
    const value = signal(initialValue);

    bindClass(clazz, value);

    return value;
}

export const bindClass = <T extends Signal<boolean>>(clazz: string, apply: T) => {
    const element = inject(ElementRef).nativeElement;
    const renderer = inject(Renderer2);

    effect(() => {
        const currentValue = apply();

        if (currentValue) {
            renderer.addClass(element, clazz);
        } else {
            renderer.removeClass(element, clazz);
        }
    });
}
