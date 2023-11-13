import { computed, ElementRef, inject } from '@angular/core';
import { filter, fromEvent, merge } from 'rxjs';

import { useEvent } from './event.composable';

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
