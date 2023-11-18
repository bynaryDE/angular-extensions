import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { bindAttribute } from '@bynary/composables/attribute';

/**
 * A set of options for the {@link useDirectionality} composable
 */
export interface IUseDirectionalityOptions {

    /**
     * The target element to bind the directionality to. Defaults to the <html> element.
     */
    target?: Element;
}

/**
 * @internal
 * Normalizes the options for the {@link useDirectionality} composable
 *
 * @param options - A set of {@link IUseDirectionalityOptions options}
 */
const normalizeOptions = (options?: IUseDirectionalityOptions): IUseDirectionalityOptions => {
    return {
        target: options?.target ?? inject(DOCUMENT).firstElementChild ?? undefined
    };
}

/**
 * Creates a signal that emits the current directionality
 *
 * @param options - A set of {@link IUseDirectionalityOptions options}
 */
export const useDirectionality = (options?: IUseDirectionalityOptions) => {
    const normalizedOptions = normalizeOptions(options);
    const directionality = inject(Directionality);
    const destroyRef = inject(DestroyRef);
    const value = signal(directionality.value);

    directionality.change
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe((v) => value.set(v));

    if (normalizedOptions.target) {
        bindAttribute('dir', value, { target: normalizedOptions.target });
    }

    return value;
};
