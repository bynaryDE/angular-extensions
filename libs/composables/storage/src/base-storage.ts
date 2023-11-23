/**
 * @internal
 * Base options for storage composables
 */
export interface IBaseStorageOptions {
    /**
     * The storage to use.
     *
     * @defaultValue localStorage
     */
    storage?: Storage;
}

/**
 * @internal
 * Normalizes the options for storage composables.
 *
 * @param options - The options to normalize
 * @returns The normalized options
 */
export const normalizeBaseStorageOptions = (options?: IBaseStorageOptions): Required<IBaseStorageOptions> => ({
    storage: options?.storage ?? localStorage
});
