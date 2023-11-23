/**
 * @packageDocumentation
 * Composables for [NGXS](https://www.ngxs.io/).
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
 * @module @bynary/composables/ngxs
 */

export * from './select.composable';
