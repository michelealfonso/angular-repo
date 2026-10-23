import { Component, Input, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists';
import { List } from '../../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cards } from "../cards/cards";

@Component({
  standalone: true,
  selector: 'app-lists',
  imports: [
    CommonModule,
    FormsModule,
    Cards,
],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists implements OnInit {
  @Input() boardId!: string;
  lists: List[] = [];
  newListName: string = '';
  token = localStorage.getItem('token') || '';

  constructor(private listService: ListsService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';

    if (this.boardId && this.token) {
      this.loadLists();
    }
  }

  loadLists(): void {
    if (!this.boardId || !this.token) return;

    this.listService.getLists(this.boardId, this.token).subscribe({
      next: (data) => {
        this.lists = data;
      },
      error: (error) => {
        console.error('Errore nel caricamento delle liste:', error);
      },
    });
  }

  createList(): void {
    if (!this.newListName.trim()) return;

    const position = this.lists.length;

    this.listService
      .createLists(this.token, this.boardId, this.newListName, position)
      .subscribe({
        next: (list) => {
          this.lists.unshift(list); // aggiunge la lista in cima
          this.newListName = ''; // resetta input
        },
        error: (err) => {
          console.error('Errore nella creazione della lista:', err);
        },
      });
  }
}
