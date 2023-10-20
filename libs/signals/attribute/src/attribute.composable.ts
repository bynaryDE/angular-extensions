import {
effect,
ElementRef,
inject,
Renderer2,
Signal,
signal,
WritableSignal
} from '@angular/core';

/**
 * A set of options for {@link bindAttribute}
 */
export interface IBindAttributeOptions {
    /**
     * The namespace of the attribute
     *
     * @example
     * a namespace `my` will result in an attribute `my:attribute-name`
     */
    namespace?: string;

    /**
     * The default value of the attribute, as a fallback, when no initial value has been defined and no value has been assigned in the DOM
     */
    defaultValue?: string;
}

/**
 * A set of options for {@link useAttribute}
 */
export interface IUseAttributeOptions extends IBindAttributeOptions {

    /**
     * The initial value of the attribute, overriding the value assigned in the DOM
     */
    initialValue?: string | null;
}

/**
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 */
const normalizeUseAttributeOptions = (options?: IUseAttributeOptions) => options ?? {}

/**
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 */
const normalizeBindAttributeOptions = (options?: IBindAttributeOptions) => options ?? {}

/**
 * Creates a signal that binds its value as an attribute on the host element.
 *
 * @param attributeName - The name of the attribute
 * @param options - A set of {@link IUseAttributeOptions options}
 */
export const useAttribute = (attributeName: string, options?: IUseAttributeOptions): WritableSignal<string | null | undefined> => {
    const { namespace, initialValue, defaultValue } = normalizeUseAttributeOptions(options);

    const element = inject(ElementRef).nativeElement as HTMLElement;
    const initialAssignedValue = element.getAttributeNS(namespace ?? null, attributeName);

    const value = signal<string | null | undefined>(
        typeof initialValue !== 'undefined' ? initialValue
            : typeof initialAssignedValue !== 'undefined' ? initialAssignedValue
                : defaultValue);

    return bindAttribute(attributeName, value, { namespace, defaultValue });
};

/**
 * Binds the value of the given signal as an attribute on the host element.
 *
 * @param attributeName - The name of the attribute
 * @param value - The signal whose value should be bound
 * @param options - A set of {@link IBindAttributeOptions options}
 */
export const bindAttribute = <T extends Signal<string | null | undefined>>(attributeName: string, value: T, options?: IBindAttributeOptions) => {
    const { namespace, defaultValue } = normalizeBindAttributeOptions(options);

    const element = inject(ElementRef).nativeElement as HTMLElement;
    const renderer = inject(Renderer2);

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
}
