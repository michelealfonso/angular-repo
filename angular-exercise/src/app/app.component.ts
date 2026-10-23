import { Component, OnInit } from '@angular/core';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InputUserComponent } from './components/input-user/input-user.component';
import { DinamicListComponent } from './components/dinamic-list/dinamic-list.component';
import { ChildrenComponent } from './components/children/children.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NgClass, NgIf, NgStyle, AsyncPipe } from '@angular/common';

import { MyServiceService } from './services/my-service.service';
import { MyDirectiveDirective } from './directives/my-directive.directive';
import { CountComponent } from './components/count/count.component';
import { BooksComponent } from './components/books/books.component';
import { CollectionBooksComponent } from './components/collection-books/collection-books.component';

import { Store } from '@ngrx/store';
import { selectBookCollection, selectBooks } from './NgRx/book/books.selectors';
import { booksActions, booksApiActions } from './NgRx/book/books.actions';
import { GoogleBooksService } from './services/books.service';
import { SignalsComponent } from './components/signals/signals.component';
import { RxjsComponent } from "./RxJs/rxjs/rxjs.component";
import { BackgroundComponent } from "./components/background/background.component";
import { Background2Component } from "./components/background-2/background-2.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    NgClass,
    NgStyle,
    NgIf,
    WelcomeComponent,
    InputUserComponent,
    DinamicListComponent,
    // ChildrenComponent,
    TodoListComponent,
    CountComponent,
    SignalsComponent,
    MyDirectiveDirective,
    BooksComponent,
    CollectionBooksComponent,
    AsyncPipe,
    RxjsComponent,
    BackgroundComponent,
    Background2Component
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-exercise';

  message: string = '';

  buttonClicked(newMessage: string) {
    this.message = newMessage;
  }

  // Variabile che controlla se la classe speciale deve essere applicata
  isSpecial: boolean = true; // Puoi cambiare a `false` per vedere l'effetto

  // Classe che verrà applicata se `isSpecial` è true
  special: string = 'special-class';

  isStyle: boolean = true;
  isUnchanged: boolean = true;
  isSize: boolean = true;
  isColor: boolean = true;
  width: boolean = true;
  height: boolean = true;
  isFlex: boolean = true;
  isJustify: boolean = true;
  isAlignItems: boolean = true;

  currentStyles: Record<string, string> = {};

  setCurrentStyles() {
    this.currentStyles = {
      width: this.width ? '100%' : 'auto',
      height: this.height ? 'auto' : 'auto',
      display: this.isFlex ? 'flex' : 'none',
      'justify-content': this.isJustify ? 'center' : 'center',
      'align-items': this.isAlignItems ? 'center' : 'center',
      'font-style': this.isStyle ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold' : 'normal',
      'font-size': this.isSize ? '24px' : '12px',
      color: this.isColor ? 'red' : 'yellow',
    };
  }

  name: string = 'Michele';

  // esempio con l'uso di ngIf

  show: boolean = true;

  // esempio con il services che vine mostrato a terminale

  messageService: string;

  // books$!: Observable<Books[]>
  // bookCollection$!: Observable<Books[]>

  books$;
  bookCollection$;

  constructor(
    private myService: MyServiceService,
    private booksService: GoogleBooksService,
    private store: Store
  ) {
    this.messageService = this.myService.getMessage();

    this.books$ = this.store.select(selectBooks);
    this.bookCollection$ = this.store.select(selectBookCollection);
  }

  // esempio cambio colore di testo con directive

  directiveText: string = 'Michele';

  // implementazione della logica in NgRx

  onAdd(bookId: string) {
    this.books$
      .subscribe((books: any) => {
        const book = books.find((b: any) => b.id === bookId);
        if (book) {
          this.store.dispatch(booksActions.addBook({ book }));
        }
      })
      .unsubscribe(); // evita memory leak: alternativa migliore è usare un Effect
  }

  onRemove(bookId: string) {
    this.books$
      .subscribe((books: any) => {
        const book = books.find((b: any) => b.id === bookId);
        if (book) {
          this.store.dispatch(booksActions.removeBook({ book }));
        }
      })
      .unsubscribe(); // evita memory leak: alternativa migliore è usare un Effect
  }

  servicesBooks() {
    this.booksService
      .getBooks()
      .subscribe((books) =>
        this.store.dispatch(booksApiActions.retrievedBookList({ books }))
      );
  }

  ngOnInit(): void {
    this.setCurrentStyles(); // permette di settare la funzione ai valori impostati

    this.servicesBooks();
  }
}
