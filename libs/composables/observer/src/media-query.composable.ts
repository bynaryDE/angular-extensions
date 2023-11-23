import { computed } from '@angular/core';

import { useEvent } from './event.composable';

/**
 * Returns a signal that tracks whether the given media query matches.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 *
 * @example
 * ```ts
 * const isPortrait = useMediaQuery('(orientation: portrait)');
 * ```
 *
 * @param query - The media query to match
 * @returns A signal holding whether the given media query matches
 */
export const useMediaQuery = (query: string) => {
    const mediaQueryList = window.matchMedia(query);
    const event = useEvent('change', mediaQueryList);

    return computed(() => {
        const currentEvent = event();

        return currentEvent == null ? mediaQueryList.matches : currentEvent?.matches;
    });
};
