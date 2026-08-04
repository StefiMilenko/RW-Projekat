import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ItemActions } from '../item-store/item.actions';

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3>Novi Item</h3>
    <input [(ngModel)]="name" placeholder="ime" />
    <input [(ngModel)]="basePrice" type="number" placeholder="basePrice" />
    <input [(ngModel)]="supply" type="number" placeholder="supply" />
    <input [(ngModel)]="demand" type="number" placeholder="demand" />
    <button (click)="onCreate()">Dodaj</button>
  `,
})
export class ItemCreateComponent {
  private store = inject(Store);

  name = '';
  basePrice = 0;
  supply = 0;
  demand = 0;

  onCreate() {
    this.store.dispatch(
      ItemActions.createItem({ name: this.name, basePrice: this.basePrice, supply: this.supply, demand: this.demand }),
    );
    this.name = '';
    this.basePrice = 0;
    this.supply = 0;
    this.demand = 0;
  }
}