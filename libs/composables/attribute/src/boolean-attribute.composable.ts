import { effect, ElementRef, inject, Signal, signal, WritableSignal } from '@angular/core';

import { useAttribute } from './attribute.composable';

/**
 * A set of options for {@link bindBooleanAttribute}
 */
export interface IBindBooleanAttributeOptions {
    /**
     * The namespace of the attribute
     *
     * @example
     * a namespace `xyz` will result in an attribute `xyz:<attribute-name>`:
     *
     * ```ts
     * const isDisabled = useBooleanAttribute('disabled', { namespace: 'xyz', initialValue: true });
     * ```
     * Or with `bindBooleanAttribute`:
     * ```ts
     * const isDisabled = signal(true);
     * bindBooleanAttribute('disabled', isDisabled, { namespace: 'xyz' });
     * ```
     *
     * This will output:
     *
     * ```html
     * <my-component xyz:disabled></my-component>
     * ```
     */
    namespace?: string;

    /**
     * The default value of the attribute, as a fallback, when no initial value has been defined and no value has been assigned in the DOM
     *
     * @example Applying a default value
     * ```ts
     * const isDisabled = useBooleanAttribute('disabled', { defaultValue: true });
     * ```
     * Or with `bindBooleanAttribute`:
     * ```ts
     * const isDisabled = signal<boolean | undefined>(undefined);
     * bindBooleanAttribute('disabled', isDisabled, { defaultValue: true });
     * ```
     * ```html
     * <my-component></my-component>
     * ```
     *
     * This will output:
     *
     * ```html
     * <my-component disabled></my-component>
     * ```
     *
     * @example Will not override if a value has been explicitly assigned in the DOM
     * ```ts
     * const isDisabled = useBooleanAttribute('disabled', { defaultValue: false });
     * ```
     * Or with `bindBooleanAttribute`:
     * ```ts
     * const isDisabled = signal<boolean | undefined>(undefined);
     * bindBooleanAttribute('disabled', isDisabled, { defaultValue: false });
     * ```
     * ```html
     * <my-component disabled></my-component>
     * ```
     *
     * This will output:
     *
     * ```html
     * <my-component disabled></my-component>
     * ```
     */
    defaultValue?: boolean;

    /**
     * The target element on which the attribute should be bound. Can be any HTMLElement.
     *
     * @example
     * ```ts
     * const isDisabled = useBooleanAttribute('disabled', { target: document.body });
     * ```
     * Or with `bindBooleanAttribute`:
     * ```
     * const isDisabled = signal<boolean | undefined>(undefined);
     * bindBooleanAttribute('disabled', isDisabled, { target: document.body });
     * ```
     */
    target?: Element;
}

/**
 * A set of options for {@link useBooleanAttribute}
 */
export interface IUseBooleanAttributeOptions extends IBindBooleanAttributeOptions {
    /**
     * The initial value of the attribute, overriding the value assigned in the DOM
     *
     * @example
     * ```ts
     * const isDisabled = useBooleanAttribute('disabled', { initialValue: false });
     * ```
     * ```html
     * <my-component #myComponent disabled></my-component>
     * ```
     *
     * This will output:
     *
     * ```html
     * <my-component></my-component>
     * ```
     */
    initialValue?: boolean;
}

type NormalizedUseBooleanAttributeOptions = IUseBooleanAttributeOptions &
    Required<Pick<IUseBooleanAttributeOptions, 'target'>>;
/**
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 * @internal
 */
const normalizeUseBooleanAttributeOptions = (
    options?: IUseBooleanAttributeOptions
): NormalizedUseBooleanAttributeOptions => ({
    ...(options ?? {}),
    target: options?.target ?? (inject(ElementRef).nativeElement as HTMLElement)
});

/**
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 * @internal
 */
const normalizeBindBooleanAttributeOptions = (options?: IBindBooleanAttributeOptions): IBindBooleanAttributeOptions =>
    options ?? {};

/**
 * @internal
 * Converts the given value to an attribute value.
 * Boolean Attributes are set, when the value is an empty string and removed, when the value is `null` or `undefined`.
 *
 * @param value - A boolean value
 * @returns
 *  an empty string, when the attribute should be set,
 * `null` when the attribute should be explicitly removed,
 * `undefined` when the attribute may be overridden
 */
const toAttributeValue = (value: boolean | undefined) => {
    if (value === true) {
        return '';
    } else if (value === false) {
        return null;
    }

    return undefined;
};

/**
 * @internal
 * Converts the given attribute value to boolean.
 * A boolean attribute is considered `true`, when the value is defined.
 *
 * @param value - The attributes value
 * @returns
 *  `true` when the attribute value is defined
 *  `false` when the attribute value is `null` or `undefined`
 */
const fromAttributeValue = (value: string | null | undefined) => {
    return value != null;
};

/**
 * Creates a signal that binds its value as a boolean attribute on the host element or a different target element.
 *
 * @example
 * ```ts
 * import { useBooleanAttribute } from '@bynary/composables/attribute';
 *
 * @Component({
 *     selector: 'my-component'
 * })
 * class MyComponent {
 *
 *     isDisabled = useBooleanAttribute('disabled');
 * }
 * ```
 *
 * @param attributeName - The name of the attribute
 * @param options - A set of {@link IUseBooleanAttributeOptions options}
 * @returns A signal holding the current value of the attribute as a boolean
 */
export const useBooleanAttribute = (
    attributeName: string,
    options?: IUseBooleanAttributeOptions
): WritableSignal<boolean | undefined> => {
    const { namespace, initialValue, defaultValue, target } = normalizeUseBooleanAttributeOptions(options);

    const attributeValue = fromAttributeValue(target.getAttributeNS(namespace ?? null, attributeName));
    const value = signal<boolean>(initialValue ?? attributeValue ?? defaultValue);

    return bindBooleanAttribute(attributeName, value, {
        namespace,
        defaultValue,
        target
    });
};

/**
 * Binds the value of the given signal as a boolean attribute on the host element or a different target element.
 *
 * @example
 * ```ts
 * import { bindBooleanAttribute } from '@bynary/composables/attribute';
 *
 * @Component({
 *     selector: 'my-component'
 * })
 * class MyComponent {
 *
 *     isDisabled = signal(false);
 *
 *     constructor() {
 *         bindBooleanAttribute('disabled', this.isDisabled);
 *     }
 * }
 * ```
 *
 * @param attributeName - The name of the attribute
 * @param value - The signal to bind
 * @param options - A set of {@link IBindBooleanAttributeOptions options}
 * @returns The passed in signal (`value` parameter)
 */
export const bindBooleanAttribute = <T extends Signal<boolean | undefined>>(
    attributeName: string,
    value: T,
    options?: IBindBooleanAttributeOptions
) => {
    const { namespace, defaultValue, target } = normalizeBindBooleanAttributeOptions(options);

    const attribute = useAttribute(attributeName, { namespace, target });
    const defaultAttributeValue = toAttributeValue(defaultValue);

    effect(
        () => {
            attribute.set(toAttributeValue(value()) ?? defaultAttributeValue);
        },
        { allowSignalWrites: true }
    );

    return value;
};
