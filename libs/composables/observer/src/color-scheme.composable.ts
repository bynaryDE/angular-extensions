import { computed, signal, WritableSignal } from '@angular/core';

import { useMediaQuery } from './media-query.composable';

export type ColorScheme = 'light' | 'dark';

/**
 * Options for the {@link useColorScheme} composable
 */
interface IUsePreferredColorSchemeOptions {
    /**
     * A signal to save the preferred color scheme to
     */
    store?: WritableSignal<ColorScheme | null>;
}

/**
 * Returns the preferred color scheme of the user
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
 * @param options - Options for the composable
 * @returns A set of signals to handle the color scheme
 * - preferred: The preferred color scheme of the user based on the browser settings
 * - store: A signal to override the preferred color scheme
 * - resolved: The resolved color scheme, based on the preferred color scheme and the override
 */
export const useColorScheme = (options?: IUsePreferredColorSchemeOptions) => {
    const preferred = usePreferredColorScheme();
    const store = options?.store ?? signal<ColorScheme | null>(null);

    if (!store()) {
        store.set(preferred());
    }

    const resolved = computed<ColorScheme | null>(() => store() ?? preferred());

    return {
        preferred,
        store,
        resolved
    };
};
