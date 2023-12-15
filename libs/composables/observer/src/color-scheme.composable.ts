import { computed, signal, WritableSignal } from '@angular/core';

import { useMediaQuery } from './media-query.composable';

/**
 * The possible color schemes
 */
export type ColorScheme = 'light' | 'dark';

/**
 * Options for the {@link useColorScheme} composable
 */
interface IUseColorSchemeOptions<CustomColorScheme extends ColorScheme = ColorScheme> {
    /**
     * A signal to save the preferred color scheme to
     *
     * @defaultValue signal<CustomColorScheme | null>(null)
     */
    store?: WritableSignal<CustomColorScheme | null>;

    /**
     * The default color-scheme as a fallback, when no value has been stored and the preferred color scheme is `null`.
     */
    defaultValue?: CustomColorScheme;
}

type NormalizedUseColorSchemeOptions<CustomColorScheme extends ColorScheme = ColorScheme> =
    IUseColorSchemeOptions<CustomColorScheme> & Required<Pick<IUseColorSchemeOptions<CustomColorScheme>, 'store'>>;

/**
 * @internal
 * Normalizes the options for the {@link useColorScheme} composable
 *
 * @param options - A set of {@link IUseColorSchemeOptions options}
 * @returns The normalized options
 */
const normalizeUseColorSchemeOptions = <CustomColorScheme extends ColorScheme = ColorScheme>(
    options?: IUseColorSchemeOptions<CustomColorScheme>
): NormalizedUseColorSchemeOptions<CustomColorScheme> => ({
    store: options?.store ?? signal<CustomColorScheme | null>(null),
    defaultValue: options?.defaultValue
});

/**
 * Returns the preferred color scheme of the browser.
 * The possible values are
 * - 'light', if the user has set the preferred color scheme to 'light' in the browser settings
 * - 'dark', if the user has set the preferred color scheme to 'dark' in the browser settings
 * - null, if the user has not set a preferred color scheme in the browser settings
 *
 * @example
 * ```ts
 * // e.g. if the user has set the preferred color scheme to 'dark' in the browser settings
 * const preferred = usePreferredColorScheme(); // preferred() === 'dark';
 *
 * // If the preferred color scheme changes, the signal will be updated. E.g. if the user changes the preferred color scheme to 'light'
 * preferred(); // 'light'
 * ```
 *
 * @returns A signal holding the preferred color scheme of the browser
 */
export const usePreferredColorScheme = () => {
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
    const prefersLight = useMediaQuery('(prefers-color-scheme: light)');

    return computed<ColorScheme | null>(() => {
        if (prefersDark()) {
            return 'dark';
        } else if (prefersLight()) {
            return 'light';
        }

        return null;
    });
};

/**
 * A composable to handle the used color scheme of the app
 *
 * @example
 * ```ts
 * // Assuming the user has set the preferred color scheme to 'dark' in the browser settings
 * const { preferred, store, resolved } = useColorScheme();
 * preferred(); // 'dark'
 * store(); // 'dark'
 * resolved(); // 'dark'
 *
 * // If the user changes the preferred color scheme to 'light' in the browser settings
 * preferred(); // 'light'
 * store(); // 'dark'
 * resolved(); // 'dark'
 *
 * // If the user changes the color scheme to 'light' in the app
 * store('light');
 * preferred(); // 'light'
 * store(); // 'light'
 * resolved(); // 'light' <- will default to preferred
 *
 * // If the user changes the color scheme to `null` in the app
 * store(null);
 * preferred(); // 'light'
 * store(); // null
 * resolved(); // 'light' <- will default to preferred
 * ```
 *
 * @param options - Options for the composable
 * @returns A set of signals to handle the color scheme
 * - preferred: The preferred color scheme of the user based on the browser settings
 * - store: A signal to override the preferred color scheme
 * - resolved: The resolved color scheme, based on the preferred color scheme and the override. The override will be used if defined, otherwise the preferred color scheme.
 */
export const useColorScheme = <CustomColorScheme extends ColorScheme = ColorScheme>(
    options?: IUseColorSchemeOptions<CustomColorScheme>
) => {
    const preferred = usePreferredColorScheme();
    const { store, defaultValue } = normalizeUseColorSchemeOptions(options);

    if (!store()) {
        store.set(preferred() as CustomColorScheme | null);
    }

    const resolved = computed<ColorScheme | null>(() => store() ?? preferred() ?? defaultValue ?? null);

    return {
        preferred,
        store,
        resolved
    };
};
