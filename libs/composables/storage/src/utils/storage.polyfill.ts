import { ALL_KEYS, CustomStorageEvent } from '../models/custom-storage-event';

Storage.prototype.setItem = new Proxy(Storage.prototype.setItem, {
    apply(target, thisArg: Storage, argumentList: [ string, string ]) {
        const event = new CustomStorageEvent({
            key: argumentList[0] as string,
            oldValue: thisArg.getItem(argumentList[0]),
            newValue: argumentList[1],
            storageArea: thisArg
        });
        const result = Reflect.apply(target, thisArg, argumentList);

        window.dispatchEvent(event);

        return result;
    }
});

Storage.prototype.removeItem = new Proxy(Storage.prototype.removeItem, {
    apply(target, thisArg: Storage, argumentList: [ string ]) {
        const event = new CustomStorageEvent({
            key: argumentList[0],
            oldValue: thisArg.getItem(argumentList[0]),
            storageArea: thisArg
        });
        const result = Reflect.apply(target, thisArg, argumentList);

        window.dispatchEvent(event);

        return result;
    }
});

Storage.prototype.clear = new Proxy(Storage.prototype.clear, {
    apply(target, thisArg: Storage, argumentList: []) {
        const event = new CustomStorageEvent({
            key: ALL_KEYS,
            storageArea: thisArg
        });
        const result = Reflect.apply(target, thisArg, argumentList);

        window.dispatchEvent(event);

        return result;
    }
});
