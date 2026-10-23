import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Books } from '../../models/books';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  @Input() books: ReadonlyArray<Books> = [];

  @Output() add = new EventEmitter<number>()

}
