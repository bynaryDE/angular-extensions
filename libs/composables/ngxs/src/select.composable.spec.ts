import { inject, Injectable, isSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Action, NgxsModule, Selector, State, StateContext, Store } from '@ngxs/store';

import { useSelect } from './select.composable';

interface IBookStateModel {
    books: string[];
}

class AddBook {
    static readonly type = '[Books] Add';

    constructor(public book: string) {
    }
}

@State<IBookStateModel>({
    name: 'books',
    defaults: {
        books: [ 'The Hobbit' ]
    }
})
@Injectable()
class BooksState {

    @Selector()
    static books(state: IBookStateModel) {
        return state.books;
    }

    @Action(AddBook)
    addBook(ctx: StateContext<IBookStateModel>, action: AddBook) {
        ctx.patchState({ books: [ ...ctx.getState().books, action.book ] });
    }
}

describe('select composable', () => {

    describe('useSelect', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ NgxsModule.forRoot([ BooksState ]) ]
            });
        });

        it('should be contained in state.utils', async () => {
            const module = await import('./select.composable');

            expect(module).toHaveProperty('useSelect');
            expect(typeof module.useSelect).toBe('function');
        });

        it('should return a Signal', async () => {
            TestBed.runInInjectionContext(() => {
                const result = useSelect(BooksState.books);

                expect(isSignal(result)).toBe(true);
                expect(result()).toEqual([ 'The Hobbit' ]);
            });
        });

        it('should pass the selector to Store.select', async () => {
            TestBed.runInInjectionContext(() => {
                const store = inject(Store);
                const selectSpy = jest.spyOn(store, 'select');

                useSelect(BooksState.books);

                expect(selectSpy).toHaveBeenCalledTimes(1);
                expect(selectSpy).toHaveBeenCalledWith(BooksState.books);

                selectSpy.mockReset();
            });
        });

        it('the returned Signal should update when the state changes', async () => {
            TestBed.runInInjectionContext(() => {
                const store = inject(Store);

                const result = useSelect(BooksState.books);

                expect(result()).toEqual([ 'The Hobbit' ]);

                store.dispatch(new AddBook('The Lord of the Rings'));

                expect(result()).toEqual([ 'The Hobbit', 'The Lord of the Rings' ]);
            });
        });
    });
});
