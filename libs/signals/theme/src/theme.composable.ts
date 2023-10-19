import { useMedia } from '../../observer/src/media.composable';

export type Theme = 'light' | 'dark' | 'system';

export const isLight = () => useMedia('(prefers-color-scheme: light)');
export const isDark = () => useMedia('(prefers-color-scheme: dark)');
