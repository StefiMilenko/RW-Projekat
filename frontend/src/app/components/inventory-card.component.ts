import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { InventoryItem } from '../models/inventory.model';
import { InventoryActions } from '../inventory-store/inventory.actions';

@Component({
  selector: 'app-inventory-card',
  standalone: true,
  template: `
    <div>
      <span>{{ entry.player?.username }} - {{ entry.item?.name }} - Quantity: {{ entry.quantity }}</span>
      <button (click)="onUpdate()">+1 quantity</button>
      <button (click)="onDelete()">Delete</button>
    </div>
  `,
})
export class InventoryCardComponent {
  @Input({ required: true }) entry!: InventoryItem;
  private store = inject(Store);

  onUpdate() {
    this.store.dispatch(InventoryActions.updateQuantity({ id: this.entry.id, quantity: this.entry.quantity + 1 }));
  }

  onDelete() {
    this.store.dispatch(InventoryActions.deleteEntry({ id: this.entry.id }));
  }
}