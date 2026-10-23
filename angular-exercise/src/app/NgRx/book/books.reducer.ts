import { createReducer, on } from '@ngrx/store';

import { booksActions } from './books.actions';
import { Books } from '../../models/books';

export const initialState: ReadonlyArray<Books> = [];

export const collectionReducer = createReducer(
  initialState,
  on(booksActions.removeBook, (state, { book }) =>
    state.filter((b) => b.id !== book.id)
  ),
  on(booksActions.addBook, (state, { book }) => {
    if (state.some(b => b.id === book.id)) return state;
    return [...state, book];
  })
);

