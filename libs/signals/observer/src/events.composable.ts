import { DestroyRef, ElementRef, inject, signal } from '@angular/core';

export const useEvents = <T extends Event>(target: EventTarget, eventName: string, initialValue?: T) => {
    const destroyRef = inject(DestroyRef, { optional: true });

    const events = signal<T | undefined>(initialValue);

    const listener = (event: Event) => {
        events.set(event as T);
    };

    target.addEventListener(eventName, listener);

    if (destroyRef) {
        destroyRef.onDestroy(() => target.removeEventListener(eventName, listener));
    }

    return events;
}

export const useHostEvents = (eventName: string) => useEvents(inject(ElementRef).nativeElement, eventName)
