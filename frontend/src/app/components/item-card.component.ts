import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../models/item.model';
import { ItemActions } from '../item-store/item.actions';

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
  private store = inject(Store);

  onUpdate() {
    this.store.dispatch(
      ItemActions.updateItem({ id: this.item.id, changes: { supply: this.item.supply + 10 } }),
    );
  }

  onDelete() {
    this.store.dispatch(ItemActions.deleteItem({ id: this.item.id }));
  }
}