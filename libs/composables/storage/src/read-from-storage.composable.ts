import { DestroyRef, inject, WritableSignal } from '@angular/core';
import { ALL_KEYS, STORAGE_CHANGE_EVENT, StorageChangeEvent } from './models/storage-change.event';
import { IBaseStorageOptions, normalizeBaseStorageOptions } from './base-storage';

/**
 * Options for {@link readFromStorage}.
 */
export interface IReadFromStorageOptions extends IBaseStorageOptions {
    /**
     * Whether to skip reading the current value from the storage initially.
     * If set to `true`, the value will be read from the storage only when it changes.
     *
     * @defaultValue false
     */
    skipInitialRead?: boolean;
}

type NormalizedReadFromStorageOptions = Required<IReadFromStorageOptions>;

/**
 * @internal
 * Normalizes the options for {@link readFromStorage}.
 *
 * @param options - The options to normalize.
 * @returns The normalized options.
 */
export const normalizeReadFromStorageOptions = (
    options?: IReadFromStorageOptions
): NormalizedReadFromStorageOptions => {
    return {
        ...normalizeBaseStorageOptions(options),
        skipInitialRead: options?.skipInitialRead ?? false
    };
};

/**
 * Reads the value from the storage into the signal, whenever the storage value changes.
 * This will **not** update the storage when the signal changes.
 *
 * @example
 * ```ts
 * localStorage.setItem('name', 'Jane');
 *
 * const name = signal<string | undefined>(undefined);
 *
 * // will set the value in the signal to 'Jane'
 * readFromStorage('name', name); // name() === 'Jane';
 *
 * // changing the signal directly will *not* update the storage
 * name.set('Alice'); // localStorage.getItem('name') === 'Jane';
 *
 * // changing the value in the storage will update the signal
 * localStorage.setItem('name', 'Mary'); // name() === 'Mary';
 * ```
 *
 * @param key - The key to use for the storage
 * @param value - A signal defining the value to read from the storage
 * @param options - A set of options for the storage
 * @returns The passed in signal (`value` parameter)
 */
export const readFromStorage = <T extends WritableSignal<string | null | undefined>>(
    key: string,
    value: T,
    options?: IReadFromStorageOptions
): T => {
    const { storage, skipInitialRead } = normalizeReadFromStorageOptions(options);
    const destroyRef = inject(DestroyRef);

    if (!skipInitialRead) {
        value.set(storage.getItem(key));
    }

    const listener: EventListener = (event: Event) => {
        if (
            !(event instanceof StorageChangeEvent) ||
            event.storageArea !== storage ||
            (event.key !== key && event.key !== ALL_KEYS)
        ) {
            return;
        }

        value.set(event.newValue);
    };

    window.addEventListener(STORAGE_CHANGE_EVENT, listener);
    destroyRef.onDestroy(() => window.removeEventListener(STORAGE_CHANGE_EVENT, listener));

    return value;
};
