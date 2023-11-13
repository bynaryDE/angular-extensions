interface ICustomEventDetail {
    key: string | typeof ALL_KEYS;
    newValue?: string | null;
    oldValue?: string | null;
    storageArea: Storage;
}

export const CUSTOM_STORAGE_EVENT = 'θstorage';
export const ALL_KEYS = Symbol('all');

export class CustomStorageEvent extends CustomEvent<ICustomEventDetail> {
    constructor(detail: ICustomEventDetail) {
        super(CUSTOM_STORAGE_EVENT, { detail });
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
