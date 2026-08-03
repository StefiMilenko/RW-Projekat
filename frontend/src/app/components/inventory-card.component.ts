import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { InventoryItem } from '../models/inventory.model';
import { InventoryService } from '../services/inventory.service';

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
  @Output() updated = new EventEmitter<InventoryItem>();
  @Output() deleted = new EventEmitter<number>();

  private inventoryService = inject(InventoryService);

  onUpdate() {
    this.inventoryService
      .updateQuantity(this.entry.id, this.entry.quantity + 1)
      .subscribe((updated) => this.updated.emit(updated));
  }

  onDelete() {
    this.inventoryService.remove(this.entry.id).subscribe(() => this.deleted.emit(this.entry.id));
  }
}