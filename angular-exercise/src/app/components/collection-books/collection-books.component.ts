import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Books } from '../../models/books';

@Component({
  selector: 'app-collection-books',
  imports: [],
  templateUrl: './collection-books.component.html',
  styleUrl: './collection-books.component.css'
})
export class CollectionBooksComponent {
  @Input() books: Books[] = [];
  @Output() remove = new EventEmitter<string>()
}
