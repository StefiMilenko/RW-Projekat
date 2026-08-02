import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { ItemCardComponent } from './item-card.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  template: `
    <div *ngFor="let item of items$ | async">
      <app-item-card [item]="item" (updated)="reload()" (deleted)="reload()"></app-item-card>
    </div>
  `,
})
export class ItemListComponent {
  private itemService = inject(ItemService);
  private refresh$ = new BehaviorSubject<void>(undefined);

  items$ = this.refresh$.pipe(switchMap(() => this.itemService.getAll()));

  reload() {
    this.refresh$.next();
  }
}