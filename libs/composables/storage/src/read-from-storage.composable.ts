import { DestroyRef, inject, WritableSignal } from '@angular/core';
import { normalizeBindStorageOptions } from './bind-storage.composable';
import { ALL_KEYS, CUSTOM_STORAGE_EVENT, CustomStorageEvent } from './models/custom-storage-event';
import { IStorageOptions } from './models/storage-options.interface';

export interface IReadFromStorageOptions extends IStorageOptions {
    skipInitialRead?: boolean;
}

export const readFromStorage = <T extends WritableSignal<string | null | undefined>>(
    key: string,
    value: T,
    options?: IReadFromStorageOptions
): T => {
    const { storage, skipInitialRead } = normalizeBindStorageOptions(options);
    const destroyRef = inject(DestroyRef);

    if (!skipInitialRead) {
        value.set(storage.getItem(key));
    }

    const listener: EventListener = (event: Event) => {
        if (!(event instanceof CustomStorageEvent)
            || event.storageArea !== storage
            || (event.key !== key && event.key !== ALL_KEYS)) {
            return;
        }

        value.set(event.newValue);
    };

    window.addEventListener(CUSTOM_STORAGE_EVENT, listener);
    destroyRef.onDestroy(() => window.removeEventListener(CUSTOM_STORAGE_EVENT, listener));

    return value;
};
