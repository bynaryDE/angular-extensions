import { BreakpointObserver } from '@angular/cdk/layout';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

/**
 * Creates a signal that tracks whether the given breakpoint matches.
 * Uses the {@link BreakpointObserver} under the hood.
 *
 * @see https://material.angular.io/cdk/layout/overview#breakpoint-observer
 *
 * @example
 * ```ts
 * const isSmallScreen = useBreakpoint('(max-width: 599px)');
 * ```
 *
 * @example
 * You can also use the predefined breakpoints from {@link Breakpoints}:
 * ```ts
 * const isHandset = useBreakpoint(Breakpoints.Handset);
 * ``
 *
 * @param breakpoint - The breakpoint to match
 */
export const useBreakpoint = (breakpoint: string) => {
    const breakpointObserver = inject(BreakpointObserver);

    return toSignal(
        breakpointObserver.observe(breakpoint).pipe(map((v) => v.matches)),
        {
            initialValue: breakpointObserver.isMatched(breakpoint)
        }
    );
};
