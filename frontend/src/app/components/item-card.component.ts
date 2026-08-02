import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-card',
  standalone: true,
  template: `
    <div>
      <span>{{ item.name }} - Supply: {{ item.supply }}  Demand: {{ item.demand }}  BasePrice: {{ item.basePrice }}</span>
      <button (click)="onUpdate()">+10 supply</button>
      <button (click)="onDelete()">Delete</button>
    </div>
  `,
})
export class ItemCardComponent {
  @Input({ required: true }) item!: Item;
  @Output() updated = new EventEmitter<Item>();
  @Output() deleted = new EventEmitter<number>();

  private itemService = inject(ItemService);

  onUpdate() {
    this.itemService
      .update(this.item.id, { supply: this.item.supply + 10 })
      .subscribe((updated) => this.updated.emit(updated));
  }

  onDelete() {
    this.itemService.remove(this.item.id).subscribe(() => this.deleted.emit(this.item.id));
  }
}