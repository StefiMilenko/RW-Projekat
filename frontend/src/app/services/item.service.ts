import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/items';

  getAll() {
    return this.http.get<Item[]>(this.baseUrl);
  }

  getOne(id: number) {
    return this.http.get<Item>(`${this.baseUrl}/${id}`);
  }

  create(item: Omit<Item, 'id'>) {
    return this.http.post<Item>(this.baseUrl, item);
  }

  update(id: number, changes: Partial<Pick<Item, 'supply' | 'demand'>>) {
    return this.http.patch<Item>(`${this.baseUrl}/${id}`, changes);
  }

  remove(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}