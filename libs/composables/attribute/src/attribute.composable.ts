import { effect, ElementRef, inject, Renderer2, Signal, signal, WritableSignal } from '@angular/core';

/**
 * A set of options for {@link bindAttribute}
 */
export interface IBindAttributeOptions {
    /**
     * The namespace of the attribute
     *
     * @example
     * A namespace `xyz` will result in an attribute `my:<attribute-name>`:
     *
     * ```ts
     * const label = useAttribute('label', { namespace: 'xyz', initialValue: 'baz' });
     * ```
     * Or with `bindAttribute`
     * ```ts
     * const label = signal('baz');
     * bindAttribute('label', mySignal, { namespace: 'xyz' });
     * ```
     *
     * Either of the above will output:
     *
     * ```html
     * <my-component xyz:label="baz"></my-component>
     * ```
     */
    namespace?: string;

    /**
     * The default value of the attribute, as a fallback, when no initial value has been defined and no value has been assigned in the DOM
     *
     * @example Applying a default value
     * ```ts
     * const label = useAttribute('label', { defaultValue: 'baz' });
     * ```
     * Or with `bindAttribute`
     * ```ts
     * const label = signal<string | undefined>(undefined);
     * bindAttribute('label', label, { defaultValue: 'baz' });
     * ```
     *
     * Either of the above will output:
     *
     * ```html
     * <my-component label="baz"></my-component>
     * ```
     *
     * @example Will not override if a value has been explicitly assigned in the DOM
     * ```ts
     * const label = useAttribute('label', { defaultValue: 'baz' });
     * ```
     * Or with `bindAttribute`
     * ```ts
     * const label = signal<string | undefined>(undefined);
     * bindAttribute('label', mySignal, { defaultValue: 'baz' });
     * ```
     *
     * Either of the above will output:
     *
     * ```html
     * <my-component label="foo"></my-component>
     * ```
     */
    defaultValue?: string;

    /**
     * The target element on which the attribute should be bound
     *
     * @example
     * ```ts
     * import { useAttribute } from '@bynary/composables/attribute';
     *
     * @Component({
     *     selector: 'my-component'
     * })
     * class MyComponent {
     *
     *     label = useAttribute('label', { target: document.body });
     * }
     * ```
     */
    target?: Element;
}

/**
 * A set of options for {@link useAttribute}
 */
export interface IUseAttributeOptions extends IBindAttributeOptions {
    /**
     * The initial value of the attribute, overriding the value assigned in the DOM
     *
     * @example
     * ```ts
     * const label = useAttribute('label', { initialValue: 'bar' });
     * ```
     * ```html
     * <my-component #myComponent label="foo"></my-component>
     * ```
     *
     * This will output:
     *
     * ```html
     * <my-component label="bar"></my-component>
     * ```
     *
     */
    initialValue?: string | null;
}

type NormalizedUseAttributeOptions = IUseAttributeOptions & Required<Pick<IUseAttributeOptions, 'target'>>;

/**
 * @internal
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 * @returns The normalized options
 */
const normalizeUseAttributeOptions = (options?: IUseAttributeOptions): NormalizedUseAttributeOptions => ({
    ...(options ?? {}),
    target: options?.target ?? (inject(ElementRef).nativeElement as HTMLElement)
});

type NormalizedBindAttributeOptions = IBindAttributeOptions & Required<Pick<IBindAttributeOptions, 'target'>>;

/**
 * @internal
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 * @returns The normalized options
 */
const normalizeBindAttributeOptions = (options?: IBindAttributeOptions): NormalizedBindAttributeOptions => ({
    ...(options ?? {}),
    target: options?.target ?? (inject(ElementRef).nativeElement as HTMLElement)
});

/**
 * Creates a signal that binds its value as an attribute on the host element or a different target element.
 *
 * @example Default usage
 *
 * By default, this composable will read the value of the attribute from the usage in the template
 *
 * ```ts
 * import { useAttribute } from '@bynary/composables/attribute';
 *
 * @Component({
 *     selector: 'my-component'
 * })
 * class MyComponent {
 *
 *     label = useAttribute('label');
 * }
 * ```
 * ```html
 * <my-component #myComponent label="foo"></my-component>
 * ```
 *
 * This will output:
 *
 * ```html
 * <my-component label="foo"></my-component>
 * ```
 *
 * @example Programmatically setting the value
 *
 * You can also change the value of the attribute programmatically by using the returned signal:
 *
 * ```ts
 * import { useAttribute } from '@bynary/composables/attribute';
 *
 * @Component({
 *     selector: 'my-component'
 * })
 * class MyComponent {
 *
 *     label = useAttribute('label');
 *
 *     constructor() {
 *         this.label.set('programmatically set value');
 *     }
 * }
 * ```
 * ```html
 * <my-component #myComponent></my-component>
 * ```
 *
 * This will output:
 *
 * ```html
 * <my-component label="programmatically set value"></my-component>
 * ```
 *
 * @param attributeName - The name of the attribute
 * @param options - A set of {@link IUseAttributeOptions options}
 * @returns A signal holding the value of the attribute
 */
export function useAttribute(
    attributeName: string,
    options?: IUseAttributeOptions
): WritableSignal<string | null | undefined> {
    const { namespace, initialValue, defaultValue, target } = normalizeUseAttributeOptions(options);

    const initialAssignedValue = target.getAttributeNS(namespace ?? null, attributeName);

    const value = signal<string | null | undefined>(
        (typeof initialValue !== 'undefined' ? initialValue : initialAssignedValue) ?? defaultValue
    );

    return bindAttribute(attributeName, value, { namespace, defaultValue, target });
}

/**
 * Binds an attribute to the host element or a different target element. Similar to `useAttribute`, but accepts a signal as an input instead of creating a new one and won't read the value from the template.
 * Will return the signal that has been passed in.
 *
 * @example
 * ```ts
 * import { bindAttribute } from '@bynary/composables/attribute';
 *
 * @Component({
 *     selector: 'my-component'
 * })
 * class MyComponent {
 *
 *     label = signal('foo');
 *
 *     constructor() {
 *         bindAttribute('label', this.label);
 *     }
 * }
 * ```
 *
 * This will output:
 *
 * ```html
 * <my-component label="label"></my-component>
 * ```
 *
 * @param attributeName - The name of the attribute
 * @param value - The signal whose value should be bound
 * @param options - A set of {@link IBindAttributeOptions options}
 * @returns The passed in signal (`value` parameter)
 */
export const bindAttribute = <T extends Signal<string | null | undefined>>(
    attributeName: string,
    value: T,
    options?: IBindAttributeOptions
) => {
    const { namespace, defaultValue, target } = normalizeBindAttributeOptions(options);

    const renderer = inject(Renderer2);

    effect(() => {
        const currentValue = value();
        const newValue = typeof currentValue !== 'undefined' ? currentValue : defaultValue;

        if (newValue != null) {
            renderer.setAttribute(target, attributeName, newValue, namespace);
        } else {
            renderer.removeAttribute(target, attributeName, namespace);
        }
    });

    return value;
};
