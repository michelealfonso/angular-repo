import { createReducer, on } from '@ngrx/store';
import { booksApiActions } from './books.actions';
import { Books } from '../../models/books';

export const initialState: ReadonlyArray<Books> = [];

export const booksReducer = createReducer(
  initialState,
  on(booksApiActions.retrievedBookList, (_state, { books }) => books)
);
