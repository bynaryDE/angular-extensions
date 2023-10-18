import { effect, signal } from '@angular/core';
import { useAttribute } from './attribute.composable';

export interface IUseBooleanAttributeOptions {
    namespace?: string;
    initialValue?: boolean;
    defaultValue?: boolean;
}

const normalizeOptions = (options?: IUseBooleanAttributeOptions) => {
    return options ?? {};
}
const toAttributeValue = (value: boolean | undefined) => {
    return value === true ? ''
        : value === false ? null
            : undefined;
}

export const useBooleanAttribute = (attributeName: string, options?: IUseBooleanAttributeOptions) => {
    const { namespace, initialValue, defaultValue } = normalizeOptions(options);

    const attribute = useAttribute(attributeName, { namespace });
    const value = signal<boolean | undefined>(initialValue ?? false);
    const defaultAttributeValue = toAttributeValue(defaultValue);

    effect(() => {
        attribute.set(toAttributeValue(value()) ?? defaultAttributeValue);
    }, { allowSignalWrites: true });

    return value;
}
