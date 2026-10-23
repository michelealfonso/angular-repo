import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = 'http://localhost:3000/api/boards';

  constructor(private http: HttpClient) {}

  getBoards(token: string): Observable<Board[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Board[]>(this.apiUrl, { headers });
  }

  createBoard(token: string, name: string): Observable<Board> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Board>(this.apiUrl, { name }, { headers });
  }
}
