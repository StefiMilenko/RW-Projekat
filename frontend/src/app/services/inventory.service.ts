import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryItem } from '../models/inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/inventory';

  getAll() {
    return this.http.get<InventoryItem[]>(this.baseUrl);
  }

  getOne(id: number) {
    return this.http.get<InventoryItem>(`${this.baseUrl}/${id}`);
  }

  create(playerId: number, itemId: number, quantity?: number) {
    return this.http.post<InventoryItem>(this.baseUrl, { playerId, itemId, quantity });
  }

  updateQuantity(id: number, quantity: number) {
    return this.http.patch<InventoryItem>(`${this.baseUrl}/${id}`, { quantity });
  }

  remove(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}