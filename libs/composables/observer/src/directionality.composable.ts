import { Directionality } from '@angular/cdk/bidi';
import { inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

export const useDirectionality = () => {
    const directionality = inject(Directionality);

    return toSignal(directionality.change.pipe(takeUntilDestroyed()), {
        initialValue: directionality.value
    });
};
