import { BreakpointObserver } from '@angular/cdk/layout';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export const useBreakpoint = (breakpoint: string) => {
    const breakpointObserver = inject(BreakpointObserver);

    return toSignal(
        breakpointObserver.observe(breakpoint).pipe(map((v) => v.matches)),
        {
            initialValue: breakpointObserver.isMatched(breakpoint)
        }
    );
};
