import { effect, Signal, signal, WritableSignal } from '@angular/core';

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
     * // or
     * const isDisabled = signal(true);
     * bindBooleanAttribute('disabled', isDisabled, { namespace: 'xyz' });
     * ```
     *
     * will result in
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
     * // or
     * const isDisabled = signal<boolean | undefined>(undefined);
     * bindBooleanAttribute('disabled', isDisabled, { defaultValue: true });
     * ```
     * ```html
     * <my-component></my-component>
     * ```
     *
     * will result in
     *
     * ```html
     * <my-component disabled></my-component>
     * ```
     *
     * @example Will not override if a value has been explicitly assigned in the DOM
     * ```ts
     * const isDisabled = useAttribute('disabled', { defaultValue: false });
     * // or
     * const isDisabled = signal<boolean | undefined>(undefined);
     * bindAttribute('disabled', isDisabled, { defaultValue: false });
     * ```
     * ```html
     * <my-component disabled></my-component>
     * ```
     *
     * will result in
     *
     * ```html
     * <my-component disabled></my-component>
     * ```
     */
    defaultValue?: boolean;

    /**
     * The host element on which the attribute should be bound. Can be any HTMLElement.
     *
     * @example
     * ```ts
     * const isDisabled = useBooleanAttribute('disabled', { host: document.body });
     * // or
     * const isDisabled = signal<boolean | undefined>(undefined);
     * bindBooleanAttribute('disabled', isDisabled, { host: document.body });
     * ```
     */
    host?: Element;
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
     * will result in
     *
     * ```html
     * <my-component></my-component>
     * ```
     */
    initialValue?: boolean;
}

/**
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 * @internal
 */
const normalizeUseBooleanAttributeOptions = (options?: IUseBooleanAttributeOptions): IUseBooleanAttributeOptions => options ?? {};

/**
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 * @internal
 */
const normalizeBindBooleanAttributeOptions = (options?: IBindBooleanAttributeOptions): IBindBooleanAttributeOptions => options ?? {};

/**
 * Converts the given value to an attribute value.
 * Boolean Attributes are set, when the value is an empty string and removed, when the value is `null` or `undefined`.
 *
 * @param value - an empty string, when the attribute should be set,`null` when the attribute should be explicitly removed, `undefined` when the attribute may be overridden
 * @internal
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
 * Creates a signal that binds its value as a boolean attribute on the host element.
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
 */
export const useBooleanAttribute = (
    attributeName: string,
    options?: IUseBooleanAttributeOptions
): WritableSignal<boolean | undefined> => {
    const { namespace, initialValue, defaultValue, host } = normalizeUseBooleanAttributeOptions(options);

    const value = signal<boolean | undefined>(initialValue);

    return bindBooleanAttribute(attributeName, value, {
        namespace,
        defaultValue,
        host
    });
};

/**
 * Binds the value of the given signal as a boolean attribute on the host element.
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
 */
export const bindBooleanAttribute = <T extends Signal<boolean | undefined>>(
    attributeName: string,
    value: T,
    options?: IBindBooleanAttributeOptions
) => {
    const { namespace, defaultValue, host } =
        normalizeBindBooleanAttributeOptions(options);

    const attribute = useAttribute(attributeName, { namespace, host });
    const defaultAttributeValue = toAttributeValue(defaultValue);

    effect(
        () => {
            attribute.set(toAttributeValue(value()) ?? defaultAttributeValue);
        },
        { allowSignalWrites: true }
    );

    return value;
};
