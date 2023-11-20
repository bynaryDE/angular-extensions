import { inject, Signal, Type } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { StateToken } from '@ngxs/store/src/state-token/state-token';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useSelect<T>(selector: (state: any, ...states: any[]) => T): Signal<T>;
export function useSelect<T = any>(selector: string | Type<any>): Signal<T>;
export function useSelect<T>(selector: StateToken<T>): Signal<T>;
/**
 * Selects a slice of data from the store.
 * Uses {@link Store#select} internally and converts its observable to a signal.
 *
 * @example
 * ```ts
 * @Component({
 *    template: `
 *      My books:
 *      <ul>
 *        <li *ngFor="let book of books()>{{ book }}</li>
 *      </ul>
 *     `
 * })
 * class BooksComponent {
 *
 *    // legacy way using an Observable
 *    @Select(BooksState.books)
 *    books$: Observable<string[]>;
 *
 *    // new way using a signal
 *    books = useSelect(BooksState.books);
 * }
 * ```
 *
 * @param selector The selector function or key
 */
export function useSelect<T>(selector: any) {
    const store = inject(Store);

    return toSignal(store.select<T>(selector));
}

/* eslint-enable @typescript-eslint/no-explicit-any */
