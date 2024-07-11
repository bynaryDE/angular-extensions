import { DestroyRef, ElementRef, inject, Signal, signal } from '@angular/core';
import { EventName, EventType } from './types/dom-events';

/**
 * @internal
 *
 * Creates a signal that listens for events on the given target and holds the last corresponding event.
 * By default, the target is the {@link ElementRef#nativeElement native element} of the current component.
 *
 * ATTENTION: Be careful when using this composable. Events are usually not meant to be represented as signals, but there are special
 * use cases, where it makes sense to do so. For example, when you want to track the last event of a certain type, like whether an element
 * is hovered, a breakpoint is matched, or a certain color-scheme used.
 *
 * @example
 * ```ts
 * const mouseMove = useEvent('mousemove');
 * ```
 *
 * @example
 * You can also pass a custom target to listen on:
 * ```ts
 * const mouseEnter = useEvent('mouseenter', myChildElement);
 * ```
 *
 * @param eventName - The name of the event
 * @param target - The target to listen events on
 * @param options - A set of options for adding the event listener (as used in {@link EventTarget#addEventListener})
 *
 * @returns A signal holding the last detected event of the given type
 */
export const θuseEvent = <Target extends EventTarget, Name extends string & EventName<Target>>(
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
        destroyRef.onDestroy(() => target.removeEventListener(eventName, listener));
    }

    return events;
};
