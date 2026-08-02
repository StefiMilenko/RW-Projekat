import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player.model';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/player';

  getAll() {
    return this.http.get<Player[]>(this.baseUrl);
  }

  getOne(id: number) {
    return this.http.get<Player>(`${this.baseUrl}/${id}`);
  }

  updateGold(id: number, gold: number) {
    return this.http.patch<Player>(`${this.baseUrl}/${id}`, { gold });
  }

  remove(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}