import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/auth';

  token = signal<string | null>(localStorage.getItem('access_token'));

  login(username: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
          this.token.set(res.access_token);
        }),
      );
  }

  register(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.token.set(null);
  }

  isLoggedIn() {
    return !!this.token();
  }
}