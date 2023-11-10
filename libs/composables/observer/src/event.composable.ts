import { DestroyRef, ElementRef, inject, Signal, signal } from '@angular/core';
import { EventName, EventType } from './types/dom-events';


/**
 * Creates a signal that emits events from the given target
 *
 * @param eventName - The name of the event
 * @param target - The target to listen events on
 * @param options - A set of options for adding the event listener (as used in {@link EventTarget#addEventListener})
 */
export const useEvent = <Target extends EventTarget, Name extends string & EventName<Target>>(
    eventName: Name,
    target: Target = inject(ElementRef).nativeElement,
    options?: AddEventListenerOptions
): Signal<EventType<Target, Name> | undefined> => {
    const destroyRef = inject(DestroyRef, { optional: true });
    const events = signal<EventType<Target, Name> | undefined>(undefined);

    const listener = (event: Event) => {
        events.set(event as EventType<Target, Name>);
    };

    target.addEventListener(eventName, listener, options);

    if (destroyRef) {
        destroyRef.onDestroy(() =>
            target.removeEventListener(eventName, listener)
        );
    }

    return events;
};
