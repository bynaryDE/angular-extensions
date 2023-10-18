import { effect, ElementRef, inject, Renderer2, signal } from '@angular/core';

export interface IUseAttributeOptions {
    namespace?: string;
    initialValue?: string;
    defaultValue?: string;
}

export const normalizeUseAttributeOptions = (options?: IUseAttributeOptions) => {
    return {
        namespace: options?.namespace ?? null,
        initialValue: options?.initialValue ?? null,
        defaultValue: options?.defaultValue ?? null
    }
}

/**
 * Sets an attribute on the host element.
 *
 * @param attributeName the name of the attribute
 * @param options a set of {@link IUseAttributeOptions options}
 */
export const useAttribute = (attributeName: string, options?: IUseAttributeOptions) => {
    const { namespace, initialValue, defaultValue } = normalizeUseAttributeOptions(options);

    const element = inject(ElementRef).nativeElement as HTMLElement;
    const renderer = inject(Renderer2);
    const initialAssignedValue = element.getAttributeNS(namespace ?? null, attributeName);

    const value = signal<string | null | undefined>(
        typeof initialValue !== 'undefined' ? initialValue
            : typeof initialAssignedValue !== 'undefined' ? initialAssignedValue
                : defaultValue);

    effect(() => {
        const currentValue = value();
        const newValue = typeof currentValue !== 'undefined' ? currentValue : defaultValue;

        if (newValue != null) {
            renderer.setAttribute(element, attributeName, newValue, namespace);
        } else {
            renderer.removeAttribute(element, attributeName, namespace);
        }
    });

    return value;
};
