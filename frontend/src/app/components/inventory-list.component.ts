import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { InventoryService } from '../services/inventory.service';
import { InventoryCardComponent } from './inventory-card.component';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, InventoryCardComponent],
  template: `
    <div *ngFor="let entry of entries$ | async">
      <app-inventory-card [entry]="entry" (updated)="reload()" (deleted)="reload()"></app-inventory-card>
    </div>
  `,
})
export class InventoryListComponent {
  private inventoryService = inject(InventoryService);
  private refresh$ = new BehaviorSubject<void>(undefined);

  entries$ = this.refresh$.pipe(switchMap(() => this.inventoryService.getAll()));

  reload() {
    this.refresh$.next();
  }
}