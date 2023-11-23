import { effect, Signal, untracked } from '@angular/core';
import { IBaseStorageOptions, normalizeBaseStorageOptions } from './base-storage';

/**
 * Options for {@link writeToStorage}.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IWriteToStorageOptions extends IBaseStorageOptions {

}

/**
 * @internal
 * Normalizes the options for {@link writeToStorage}.
 *
 * @param options - The options to normalize
 * @returns The normalized options
 */
const normalizeWriteToStorageOptions = (options?: IWriteToStorageOptions) => normalizeBaseStorageOptions(options);

/**
 * Writes the value of the given signal to the storage whenever it changes.
 * This will **not** update the signal when the value in the storage changes.
 *
 * @example
 * ```ts
 * const name = signal('Jane');
 *
 * // will set the value in the storage to 'Jane', even if it was previously set to something else
 * writeToStorage('name', name); // localStorage.getItem('name') === 'Jane';
 *
 * // changing the value in the storage will **not** update the signal
 * localStorage.setItem('name', 'Alice'); // name() === 'Jane';
 *
 * // changing the signal directly will update the storage
 * name.set('Mary'); // localStorage.getItem('name') === 'Mary';
 * ```
 *
 * @param key - The key to use for the storage
 * @param value - A signal defining the value to write to the storage
 * @param options - A set of options for the storage
 * @returns The passed in signal (`value` parameter)
 */
export const writeToStorage = <T extends Signal<string | null | undefined>>(
    key: string,
    value: T,
    options?: IWriteToStorageOptions
): T => {
    const { storage } = normalizeWriteToStorageOptions(options);

    effect(() => {
        const currentValue = value();

        untracked(() => {
            if (currentValue != null) {
                storage.setItem(key, currentValue);
            } else {
                storage.removeItem(key);
            }
        });
    });

    return value;
};

