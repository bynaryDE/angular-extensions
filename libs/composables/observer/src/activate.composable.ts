import { computed, ElementRef, inject } from '@angular/core';
import { filter, fromEvent, merge } from 'rxjs';

import { useHostEvents } from './events.composable';

interface IUseActivateOptions {
    click?: boolean;
    keydown?: string[];
}

export const useActivate = (options: IUseActivateOptions) => {
    const target = inject(ElementRef).nativeElement;

    const click$ = fromEvent<PointerEvent>(target, 'click');
    const keydown$ = fromEvent<KeyboardEvent>(target, 'keydown').pipe(
        filter((event) => options.keydown?.includes(event.key) ?? false)
    );

    return merge(click$, keydown$);
};

export const useActivateSignal = (options: IUseActivateOptions) => {
    const click = useHostEvents('click');
    const keydown = useHostEvents('keydown');

    return computed(() => {
        if (options.click && click()) {
            return click();
        }

        if (
            options.keydown &&
            keydown() &&
            options.keydown.includes((keydown() as KeyboardEvent)?.key)
        ) {
            return keydown();
        }

        return undefined;
    });
};
