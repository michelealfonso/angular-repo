import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Books } from '../../models/books';

export const selectBooks = createFeatureSelector<ReadonlyArray<Books>>('books');

export const selectCollectionState = createFeatureSelector<
  ReadonlyArray<number>
>('collection');

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books, collection) => {
    return collection.map((id) => books.find((book) => book.id === id)!);
  }
);
