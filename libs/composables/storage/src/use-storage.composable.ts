import { signal } from '@angular/core';
import { bindStorage, IBindStorageOptions, normalizeBindStorageOptions } from './bind-storage.composable';

/**
 * Options for {@link useStorage}
 */
export interface IUseStorageOptions<T extends string> extends IBindStorageOptions {

    /**
     * The initial value to use for the storage.
     *
     * @defaultValue - The current value from the storage
     */
    initialValue?: T | null;
}

/**
 * @internal
 * Normalizes the options for {@link useStorage}.
 *
 * @param key - The key to use for the storage
 * @param options - The options to normalize
 * @returns The normalized options
 */
const normalizeUseStorageOptions = <T extends string>(key: string, options?: IUseStorageOptions<T>) => {
    const baseStorageOptions = normalizeBindStorageOptions(options);

    return {
        ...baseStorageOptions,
        initialValue: options?.initialValue ?? baseStorageOptions.storage.getItem(key) as T | null
    };
}
/**
 * Creates a signal that is synced with the given storage.
 * When the value of the signal changes, it will be written to the storage.
 * When the value in the storage changes, the signal will be updated.
 *
 * @example
 * ```ts
 * // will set the value in the storage to 'Jane', even if it was previously set to something else
 * const name = useStorage('name', { initialValue: 'Jane' }); // localStorage.getItem('name') === 'Jane';
 *
 * // changing the signal directly will update the storage
 * name.set('Alice'); // localStorage.getItem('name') === 'Alice';
 *
 * // changing the value in the storage will update the signal
 * localStorage.setItem('name', 'Mary'); // name() === 'Mary';
 * ```
 *
 * @param key - The key to use for the storage
 * @param options - A set of options for the storage
 * @returns A signal that is synced with the given storage
 */
export const useStorage = <T extends string>(
    key: string,
    options?: IUseStorageOptions<T>
) => {
    const { storage, initialValue } = normalizeUseStorageOptions(key, options);
    return bindStorage(key, signal(initialValue), { storage });
};
