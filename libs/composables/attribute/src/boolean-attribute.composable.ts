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
     * a namespace `my` will result in an attribute `my:attribute-name`
     */
    namespace?: string;

    /**
     * The default value of the attribute, as a fallback, when no initial value has been defined and no value has been assigned in the DOM
     */
    defaultValue?: boolean;

    /**
     * The host element on which the attribute should be bound
     */
    host?: Element;
}

/**
 * A set of options for {@link useBooleanAttribute}
 */
export interface IUseBooleanAttributeOptions
    extends IBindBooleanAttributeOptions {
    /**
     * The initial value of the attribute, overriding the value assigned in the DOM
     */
    initialValue?: boolean;
}

/**
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 */
const normalizeUseBooleanAttributeOptions = (
    options?: IUseBooleanAttributeOptions
) => options ?? {};

/**
 * Normalizes the given options.
 *
 * @param options - The options to normalize
 */
const normalizeBindBooleanAttributeOptions = (
    options?: IBindBooleanAttributeOptions
) => options ?? {};

/**
 * Converts the given value to an attribute value.
 * Boolean Attributes are set, when the value is an empty string and removed, when the value is `null` or `undefined`.
 *
 * @param value - an empty string, when the attribute should be set,`null` when the attribute should be explicitly removed, `undefined` when the attribute may be overridden
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
