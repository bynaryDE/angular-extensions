import { DestroyRef, effect, inject, Signal, signal, WritableSignal } from '@angular/core';

export const useStorage = <T extends string>(
    key: string,
    storage: Storage = localStorage,
    initialValue: T | null = storage.getItem(key) as T | null
) => {
    let value = signal(initialValue);

    value = useReadFromStorage(key, value, storage);

    return useWriteToStorage(key, value, storage);
};

export const useReadFromStorage = <T extends WritableSignal<string | null>>(
    key: string,
    value: T,
    storage: Storage = localStorage
): T => {
    const destroyRef = inject(DestroyRef);

    const listener = (event: StorageEvent) => {
        if (event.storageArea !== storage || event.key !== key) {
            return;
        }

        value.set(event.newValue);
    };

    window.addEventListener('storage', listener);
    destroyRef.onDestroy(() => window.removeEventListener('storage', listener));

    return value;
};

export const useWriteToStorage = <T extends Signal<string | null>>(
    key: string,
    value: T,
    storage: Storage = localStorage
): T => {
    effect(() => {
        const currentValue = value();

        if (currentValue != null) {
            storage.setItem(key, currentValue);
        } else {
            storage.removeItem(key);
        }
    });

    return value;
};
