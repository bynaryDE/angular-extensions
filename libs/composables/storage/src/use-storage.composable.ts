import { signal } from '@angular/core';
import { bindStorage } from './bind-storage.composable';
import { IStorageOptions } from './models/storage-options.interface';

export interface IUseStorageOptions<T extends string> extends IStorageOptions {
    initialValue?: T | null;
}

const normalizeUseStorageOptions = <T extends string>(key: string, options?: IUseStorageOptions<T>) => {
    const storage = options?.storage ?? localStorage;

    return {
        storage,
        initialValue: options?.initialValue ?? storage.getItem(key) as T | null,
        ...options
    };
}
/**
 * Creates a signal that is synced with the given storage
 *
 * @param key - The key to use for the storage
 * @param options- A set of options for the storage
 */
export const useStorageComposable = <T extends string>(
    key: string,
    options?: IUseStorageOptions<T>
) => {
    const { storage, initialValue } = normalizeUseStorageOptions(key, options);
    return bindStorage(key, signal(initialValue), { storage });
};
