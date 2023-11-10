import { computed } from '@angular/core';

import { useEvent } from './event.composable';

/**
 * Returns a signal that emits when the given media query matches
 *
 * @param query - The media query to match
 */
export const useMediaQuery = (query: string) => {
    const mediaQueryList = window.matchMedia(query);
    const event = useEvent('change', mediaQueryList);

    return computed(() => {
        const currentEvent = event();

        return currentEvent == null
            ? mediaQueryList.matches
            : currentEvent?.matches;
    });
};
