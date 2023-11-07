import { ElementRef, inject, Renderer2 } from '@angular/core';

const CLASS_SEPARATOR_REGEX = /\s+/;


/**
 * Splits the given classes into an array of classes.
 *
 * @param classes - The classes to split
 */
export const splitClasses = (classes: string | string[] | null | undefined) => {
    if (typeof classes !== 'string') {
        return classes;
    }

    return classes ? classes.split(CLASS_SEPARATOR_REGEX) : [];
};

/**
 * Adds the class to the host element.
 * This function uses {@link inject} and has to be called in the injection context of a component or directive.
 *
 * @param clazz - The class to add.
 */
export const addClass = (clazz: string) => {
    const element = inject(ElementRef).nativeElement;
    const renderer = inject(Renderer2);

    renderer.addClass(element, clazz);
};
