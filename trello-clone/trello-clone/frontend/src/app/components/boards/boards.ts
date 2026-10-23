import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/models';
import { BoardService } from '../../services/boards';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Lists } from "../lists/lists";


@Component({
  standalone: true,
  selector: 'app-boards',
  imports: [
    FormsModule,
    CommonModule,
    Lists
],
  templateUrl: './boards.html',
  styleUrl: './boards.css',
})
export class Boards implements OnInit {
  boards: Board[] = [];
  newBoardName: string = '';

  constructor(private boardService: BoardService) {}

  async ngOnInit() {
    this.loadBoards();
  }

  loadBoards() {
  const token = localStorage.getItem('token');
  if (!token) return;

  this.boardService.getBoards(token).subscribe({
    next: (boards) => {
      this.boards = boards;
      console.log('Boards caricate:', boards);
    },
    error: (err) => console.error('Errore nel caricamento:', err),
  });
  }

  addBoards() {
    if (!this.newBoardName.trim()) return;

    const token = localStorage.getItem('token');
    console.log('token inviato', token)
    console.log('nome della board aggiunta:', this.newBoardName)

    if (!token) {
      alert('Devi fare login prima');
      return;
    }

    this.boardService
      .createBoard(token, this.newBoardName)
      .subscribe(board => {
        this.boards.unshift(board);
        this.newBoardName = '';
      });
  }
}
