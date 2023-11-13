// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { WritableSignal } from '@angular/core';
import { IReadFromStorageOptions, readFromStorage } from './read-from-storage.composable';
import { writeToStorage } from './write-to-storage.composable';

export interface IBindStorageOptions extends IReadFromStorageOptions {
}

export const normalizeBindStorageOptions = (options?: IReadFromStorageOptions) => {
    return {
        storage: options?.storage ?? localStorage,
        skipInitialRead: options?.skipInitialRead ?? false
    };
}
export const bindStorage = <T extends WritableSignal<string | null | undefined>>(
    key: string,
    value: T,
    options?: IBindStorageOptions
) => {
    return readFromStorage(key, writeToStorage(key, value, options), options);
}
