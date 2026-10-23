import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards';
import { Card, CardStatus } from '../../models/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
@Component({
  standalone: true,
  selector: 'app-cards',
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
  ],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards implements OnInit {
  @Input() listId!: string;
  cards: Card[] = [];
  newCardName: string = '';
  newCardDescription: string = '';
  newDueDate: string = '';
  token = localStorage.getItem('token') || '';

  constructor(
    private cardService: CardsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';

    console.log('Cards Component - listId:', this.listId);

    if (this.listId && this.token) {
      this.loadCards();
    }
  }

  loadCards() {
    if (!this.listId || !this.token) return;

    this.cardService.getCards(this.listId, this.token).subscribe({
      next: (data) => {
        this.cards = data;
      },
      error: (error) => {
        console.error('Errore nel caricamento delle liste:', error);
      },
    });
  }

  createCard(): void {
    if (!this.newCardName.trim()) return;

    const position = this.cards.length;

    this.cardService
      .createCard(
        this.token,
        this.listId,
        this.newCardName,
        this.newCardDescription,
        position,
        this.newDueDate
      )
      .subscribe({
        next: (card) => {
          console.log('nuova card', card);
          this.cards.unshift(card); // aggiunge la lista in cima
          this.cdr.detectChanges();
          this.newCardName = ''; // resetta input
          this.newCardDescription = '';
          this.newDueDate = '';
        },
        error: (err) => {
          console.error('Errore nella creazione della lista:', err);
        },
      });
  }

  updateCard(
    card: Card,
    newTitle: string,
    newDescription: string,
    newDueDate: Date,
    status?: string
  ) {
    const token = this.token;
    const updateData: Partial<Card> = {
      title: newTitle,
      description: newDescription,
      due_date: newDueDate,
    };

    if (status !== undefined) {
      updateData.status = status as CardStatus;
    }

    console.log('Aggiorno card con id:', card.id, 'con dati:', updateData);

    this.cardService.updateCard(token, card.id, updateData).subscribe({
      next: (updatedCard) => {
        const index = this.cards.findIndex((c) => c.id === card.id);
        if (index !== -1) {
          this.cards[index] = updatedCard;
        }
        console.log('Card aggiornata con successo');
      },
      error: (error) => {
        console.error('Errore aggiornamento card:', error);
      },
    });
  }

  toggleEdit(card: Card) {
    card['isEditing'] = !card['isEditing'];
  }

  markAsDone(card: Card) {
    const token = localStorage.getItem('token') || '';
    this.cardService.updateCard(token, card.id, { is_done: true }).subscribe({
      next: () => {
        card.is_done = true;
        this.cdr.detectChanges();
        console.log('Card marcata come completata');
      },
      error: (error) => {
        console.error('Errore aggiornamento stato card:', error);
      },
    });
  }

  deleteCard(card: Card) {
    console.log(`carta eliminata`)

    const token = localStorage.getItem('token') || '';

    console.log(token);
    console.log('cardId:', card.id);

    this.cardService.deleteCard(token, card.id).subscribe({
      next: (deleteCard) => {
         this.cards = this.cards.filter(c => String(c.id) !== String(card.id));
          console.log(`card eliminata con successo`, deleteCard);
      },
      error: (error) => {
         console.error('Errore eliminazione card:', error);
      }
    })
  }

  getStatusColor(status: CardStatus | undefined): string {
    switch (status) {
      case 'pending':
        return 'red';
      case 'in_progress':
        return 'orange';
      case 'done':
        return 'green';
      default:
        return 'gray';
    }
  }
}
