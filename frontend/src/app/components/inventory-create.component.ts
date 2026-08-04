import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InventoryActions } from '../inventory-store/inventory.actions';

@Component({
  selector: 'app-inventory-create',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3>Novi Inventory unos</h3>
    <input [(ngModel)]="playerId" type="number" placeholder="playerId" />
    <input [(ngModel)]="itemId" type="number" placeholder="itemId" />
    <input [(ngModel)]="quantity" type="number" placeholder="quantity" />
    <button (click)="onCreate()">Dodaj</button>
  `,
})
export class InventoryCreateComponent {
  private store = inject(Store);

  playerId = 0;
  itemId = 0;
  quantity = 1;

  onCreate() {
    this.store.dispatch(
      InventoryActions.createEntry({ playerId: this.playerId, itemId: this.itemId, quantity: this.quantity }),
    );
    this.playerId = 0;
    this.itemId = 0;
    this.quantity = 1;
  }
}