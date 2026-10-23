import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  items: { title: string, completed: boolean }[] = [];  // Modifica items in un array di oggetti con "title" e "completed"

  newItem: string = '';  // Variabile per il titolo del nuovo elemento

  // Funzione per aggiungere una nuova attività
  addItems(): void {
    if (this.newItem.trim()) {
      this.items.push({ title: this.newItem, completed: false });
      this.newItem = '';  // Reset del campo di input
    }
  }

  // Funzione per segnare l'attività come completata (alternando lo stato)
  checkedItems(index: number): void {
    this.items[index].completed = !this.items[index].completed;  // Alterna lo stato di "completed"
  }
  removeItems(index: number) {
    this.items.splice(index, 1)
  }

}
