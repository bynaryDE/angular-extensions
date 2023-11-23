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
     *
     * @defaultValue document.firstElementChild
     */
    target?: Element;
}

/**
 * @internal
 * Normalizes the options for the {@link useDirectionality} composable
 *
 * @param options - A set of {@link IUseDirectionalityOptions options}
 * @returns The normalized options
 */
const normalizeOptions = (options?: IUseDirectionalityOptions): IUseDirectionalityOptions => {
    return {
        target: options?.target ?? inject(DOCUMENT).firstElementChild ?? undefined
    };
};

/**
 * Creates a signal that emits the current directionality
 *
 * @example
 * ```ts
 * const target = document.firstElementChild; // this is the default target and does not need to be specified in the options
 * const direction = useDirectionality(); // direction() === 'ltr' | 'rtl'
 *
 * // If a target is specified, the 'dir' attribute of the target will be updated
 * direction.set('ltr'); // target.getAttribute('dir') === 'ltr'
 *
 * // When the directionality changes, the signal will be updated
 * target.setAttribute('dir', 'rtl'); // direction() === 'rtl'
 * ```
 *
 * @param options - A set of {@link IUseDirectionalityOptions options}
 * @returns A signal holding the current directionality
 */
export const useDirectionality = (options?: IUseDirectionalityOptions) => {
    const normalizedOptions = normalizeOptions(options);
    const directionality = inject(Directionality);
    const destroyRef = inject(DestroyRef);
    const value = signal(directionality.value);

    directionality.change.pipe(takeUntilDestroyed(destroyRef)).subscribe((v) => value.set(v));

    if (normalizedOptions.target) {
        bindAttribute('dir', value, { target: normalizedOptions.target });
    }

    return value;
};
