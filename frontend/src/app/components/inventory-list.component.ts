import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { InventoryActions } from '../inventory-store/inventory.actions';
import { selectAllInventory } from '../inventory-store/inventory.selector';
import { InventoryCardComponent } from './inventory-card.component';
import { InventoryCreateComponent } from './inventory-create.component';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, InventoryCardComponent, InventoryCreateComponent],
  template: `
    <app-inventory-create></app-inventory-create>
    <div *ngFor="let entry of entries$ | async">
    <app-inventory-card [entry]="entry"></app-inventory-card>
  </div>
`,
})
export class InventoryListComponent implements OnInit {
  private store = inject(Store);
  entries$ = this.store.select(selectAllInventory);

  ngOnInit() {
    this.store.dispatch(InventoryActions.loadInventory());
  }
}