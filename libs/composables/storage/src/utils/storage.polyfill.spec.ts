import { ALL_KEYS, CUSTOM_STORAGE_EVENT, CustomStorageEvent } from '../models/custom-storage-event';

describe.each([
    ['localStorage', localStorage],
    ['sessionStorage', sessionStorage]
])('storage polyfill (%s)', (name, storage) => {

    afterEach(() => {
        storage.clear();
    });

    describe(`setItem`, () => {

        it('should emit the correct storage event when adding an item', (done) => {
            // @ts-ignore - we're testing the CustomStorageEvent explicitly
            window.addEventListener(CUSTOM_STORAGE_EVENT, (event: CustomStorageEvent) => {
                expect(event.key).toEqual('foo');
                expect(event.newValue).toEqual('bar');
                expect(event.oldValue).toBeNull();
                expect(event.storageArea).toBe(storage);

                done()
            }, { once: true });

            storage.setItem('foo', 'bar');
        });

        it('should emit the correct storage event when changing an item', (done) => {
            storage.setItem('foo', 'bar');

            // @ts-ignore - we're testing the CustomStorageEvent explicitly
            window.addEventListener(CUSTOM_STORAGE_EVENT, (event: CustomStorageEvent) => {
                expect(event.key).toEqual('foo');
                expect(event.newValue).toEqual('baz');
                expect(event.oldValue).toEqual('bar');
                expect(event.storageArea).toBe(storage);

                done()
            }, { once: true });

            storage.setItem('foo', 'baz');
        });
    });

    describe(`removeItem`, () => {

        it('should emit an event even if the key was not present yet', (done) => {
            // @ts-ignore - we're testing the CustomStorageEvent explicitly
            window.addEventListener(CUSTOM_STORAGE_EVENT, (event: CustomStorageEvent) => {
                expect(event.key).toEqual('foo');
                expect(event.newValue).toBeUndefined();
                expect(event.oldValue).toBeNull();
                expect(event.storageArea).toBe(storage);

                done()
            }, { once: true });

            storage.removeItem('foo');
        });

        it('should emit the correct storage event when removing an item', (done) => {
            storage.setItem('foo', 'bar');

            // @ts-ignore - we're testing the CustomStorageEvent explicitly
            window.addEventListener(CUSTOM_STORAGE_EVENT, (event: CustomStorageEvent) => {
                expect(event.key).toEqual('foo');
                expect(event.newValue).toBeUndefined();
                expect(event.oldValue).toEqual('bar');
                expect(event.storageArea).toBe(storage);

                done()
            }, { once: true });

            storage.removeItem('foo');
        });
    });

    describe(`clear`, () => {

        it('should emit the correct storage event', (done) => {
            storage.setItem('foo', 'bar');

            // @ts-ignore - we're testing the CustomStorageEvent explicitly
            window.addEventListener(CUSTOM_STORAGE_EVENT, (event: CustomStorageEvent) => {
                expect(event.key).toEqual(ALL_KEYS);
                expect(event.newValue).toBeUndefined();
                expect(event.oldValue).toBeUndefined();
                expect(event.storageArea).toBe(storage);

                done()
            }, { once: true });

            storage.clear();
        });
    });
});
