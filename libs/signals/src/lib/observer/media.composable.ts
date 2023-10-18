import { computed } from '@angular/core';

import { useEvents } from './events.composable';

export const useMedia = (query: string) => {
    const mediaQuery = window.matchMedia(query);
    const event = useEvents<MediaQueryListEvent>(mediaQuery, 'change');

    return computed(() => {
        const currentEvent = event();

        return currentEvent == null ? mediaQuery.matches : currentEvent?.matches;
    });
}
