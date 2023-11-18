interface ICustomEventDetail {
    key: string | typeof ALL_KEYS;
    newValue?: string | null;
    oldValue?: string | null;
    storageArea: Storage;
}

/**
 * The name of the event that is emitted whenever the storage changes.
 *
 * @see StorageChangeEvent
 */
export const STORAGE_CHANGE_EVENT = 'θstorage';
export const ALL_KEYS = Symbol('all');

/**
 * A custom event that is emitted whenever the storage changes.
 * This is a shim for the native StorageEvent, which is only emitted when the storage changes from a different window.
 */
export class StorageChangeEvent extends CustomEvent<ICustomEventDetail> {
    constructor(detail: ICustomEventDetail) {
        super(STORAGE_CHANGE_EVENT, { detail });
    }

    get key() {
        return this.detail.key;
    }

    get newValue() {
        return this.detail.newValue;
    }

    get oldValue() {
        return this.detail.oldValue;
    }

    get storageArea() {
        return this.detail.storageArea;
    }
}
