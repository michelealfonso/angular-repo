import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private apiUrl = 'http://localhost:3000/api/cards';

  constructor(private http: HttpClient) {}

  getCards(list_id: string, token: string): Observable<Card[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Card[]>(`${this.apiUrl}/list/${list_id}`, { headers });
  }

  createCard(token: string, list_id: string, title: string, description: string, position: number, newDueDate: string): Observable<Card> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Card>(
      this.apiUrl,
      { list_id, title, description, position, due_date: newDueDate },
      { headers }
    );
  }

  updateCard(token: string, cardId: string, updateData: Partial<Card>) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<Card>(`${this.apiUrl}/${cardId}`, updateData, {
      headers,
    });
  }

  deleteCard(token: string, card_id: string): Observable<Card> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.http.delete<Card>(`${this.apiUrl}/${card_id}`, { headers })
  }
}
