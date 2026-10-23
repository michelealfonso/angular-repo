import { createActionGroup, props } from "@ngrx/store";
import { Books } from "../../models/books";

export const booksActions = createActionGroup({
  source: 'Books',
  events: {
    'Add Book': props<{book: Books}>(),
    'Remove Book': props<{book: Books}>()
  },
});

export const booksApiActions = createActionGroup({
  source: 'Book APi endpoint',
  events: {
    'Retrieved Book List': props<{books: ReadonlyArray<Books>}>()
  }
})
