import { computed } from '@angular/core';

import { useMedia } from './media.composable';

export type PreferredColorScheme = 'light' | 'dark';

export const usePreferredColorScheme = () => {
    const isDark = useMedia('(prefers-color-scheme: dark)');

    return computed(() => (isDark() ? 'dark' : 'light'));
};
