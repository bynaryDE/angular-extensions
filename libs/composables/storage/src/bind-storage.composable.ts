// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { WritableSignal } from '@angular/core';
import {
    IReadFromStorageOptions,
    normalizeReadFromStorageOptions,
    readFromStorage
} from './read-from-storage.composable';
import { writeToStorage } from './write-to-storage.composable';

/**
 * Options for {@link bindStorage}.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBindStorageOptions extends IReadFromStorageOptions {}

/**
 * @internal
 * Normalizes the options for {@link bindStorage}.
 *
 * @param options - The options to normalize
 * @returns The normalized options
 */
export const normalizeBindStorageOptions = (options?: IBindStorageOptions) => normalizeReadFromStorageOptions(options);

/**
 * Binds the given signal to the storage.
 * When the value of the signal changes, it will be written to the storage.
 * When the value in the storage changes, the signal will be updated.
 *
 * @example
 * ```ts
 * const name = signal('Jane');
 *
 * // will set the value in the storage to 'Jane', even if it was previously set to something else
 * bindStorage('name', name); // localStorage.getItem('name') === 'Jane';
 *
 * // changing the signal directly will update the storage
 * name.set('Alice'); // localStorage.getItem('name') === 'Alice';
 *
 * // changing the value in the storage will update the signal
 * localStorage.setItem('name', 'Mary'); // name() === 'Mary';
 * ```
 *
 * @param key - The key to use for the storage
 * @param value - The signal to bind to the storage
 * @param options - A set of options for the storage
 * @returns The passed in signal (`value` parameter)
 */
export const bindStorage = <T extends WritableSignal<string | null | undefined>>(
    key: string,
    value: T,
    options?: IBindStorageOptions
) => {
    return readFromStorage(key, writeToStorage(key, value, options), options);
};
