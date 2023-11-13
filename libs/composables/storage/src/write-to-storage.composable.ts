import { effect, Signal, untracked } from '@angular/core';
import { normalizeBindStorageOptions } from './bind-storage.composable';
import { IStorageOptions } from './models/storage-options.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IWriteToStorageOptions extends IStorageOptions {

}

export const writeToStorage = <T extends Signal<string | null | undefined>>(
    key: string,
    value: T,
    options?: IWriteToStorageOptions
): T => {
    const { storage } = normalizeBindStorageOptions(options);

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

