import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ItemActions } from '../item-store/item.actions';
import { selectAllItems } from '../item-store/item.selector';
import { ItemCardComponent } from './item-card.component';
import { ItemCreateComponent } from './item-create.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent, ItemCreateComponent],
  template: `
    <app-item-create></app-item-create>
    <div *ngFor="let item of items$ | async">
      <app-item-card [item]="item"></app-item-card>
    </div>
  `,
})
export class ItemListComponent implements OnInit {
  private store = inject(Store);
  items$ = this.store.select(selectAllItems);

  ngOnInit() {
    this.store.dispatch(ItemActions.loadItems());
  }
}