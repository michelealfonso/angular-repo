import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private apiUrl = 'http://localhost:3000/api/lists';

  constructor(private http: HttpClient) { }

  getLists(board_id: string, token: string): Observable<List[]> {
    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
    })
    return this.http.get<List[]>(`${this.apiUrl}/${board_id}`, { headers })
  }

    createLists(token: string, board_id: string, name: string, position: number): Observable<List> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.post<List>(this.apiUrl, { board_id, name, position }, { headers });
    }

    updateListPosition(listId: string, position: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    });
    return this.http.put(`${this.apiUrl}/${listId}/position`, { position }, { headers });
  }
}

