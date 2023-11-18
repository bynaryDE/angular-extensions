import { computed, ElementRef, inject } from '@angular/core';
import { filter, fromEvent, merge } from 'rxjs';

import { useEvent } from './event.composable';

interface IUseActivateOptions {
    click?: boolean;
    keydown?: string[];
}

/**
 * @internal
 * Tracks the activation of an element. An element is considered activated if it is clicked or if a keydown event is fireed while the element is focused.
 *
 * @param options
 */
export const θuseActivate = (options: IUseActivateOptions) => {
    const target = inject(ElementRef).nativeElement;

    const click$ = fromEvent<PointerEvent>(target, 'click');
    const keydown$ = fromEvent<KeyboardEvent>(target, 'keydown').pipe(
        filter((event) => options.keydown?.includes(event.key) ?? false)
    );

    return merge(click$, keydown$);
};

/**
 * @internal
 * Tracks the activation of an element. An element is considered activated if it is clicked or if a keydown event is fired while the element is focused.
 *
 * Alternative implementation of {@link θuseActivate} using {@link useEvent}.
 *
 * @param options
 */
export const θuseActivateSignal = (options: IUseActivateOptions) => {
    const click = useEvent('click');
    const keydown = useEvent('keydown');

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
