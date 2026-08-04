import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ItemService } from '../services/item.service';
import { ItemActions } from './item.actions';

@Injectable()
export class ItemEffects {
  private actions$ = inject(Actions);
  private itemService = inject(ItemService);

  createItem$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ItemActions.createItem),
    mergeMap(({ name, basePrice, supply, demand }) =>
      this.itemService.create({ name, basePrice, supply: supply ?? 0, demand: demand ?? 0 }).pipe(
        map((item) => ItemActions.createItemSuccess({ item })),
        catchError((error) => of(ItemActions.createItemFailure({ error: error.message }))),
      ),
    ),
  ),
);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      mergeMap(() =>
        this.itemService.getAll().pipe(
          map((items) => ItemActions.loadItemsSuccess({ items })),
          catchError((error) => of(ItemActions.loadItemsFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.updateItem),
      mergeMap(({ id, changes }) =>
        this.itemService.update(id, changes).pipe(
          map((item) => ItemActions.updateItemSuccess({ item })),
          catchError((error) => of(ItemActions.updateItemFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.deleteItem),
      mergeMap(({ id }) =>
        this.itemService.remove(id).pipe(
          map(() => ItemActions.deleteItemSuccess({ id })),
          catchError((error) => of(ItemActions.deleteItemFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}