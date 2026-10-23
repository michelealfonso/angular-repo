import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  token?: string;
  error?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string,): Observable<AuthResponse> {
    console.log('chiamata /register con:', {username, email, password})
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, {username, email, password });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { email, password });
  }

  getProfile(token: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
