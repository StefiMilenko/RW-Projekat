import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { InventoryService } from '../services/inventory.service';
import { InventoryActions } from './inventory.actions';

@Injectable()
export class InventoryEffects {
  private actions$ = inject(Actions);
  private inventoryService = inject(InventoryService);

  loadInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryActions.loadInventory),
      mergeMap(() =>
        this.inventoryService.getAll().pipe(
          map((entries) => InventoryActions.loadInventorySuccess({ entries })),
          catchError((error) => of(InventoryActions.loadInventoryFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  updateQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryActions.updateQuantity),
      mergeMap(({ id, quantity }) =>
        this.inventoryService.updateQuantity(id, quantity).pipe(
          map((entry) => InventoryActions.updateQuantitySuccess({ entry })),
          catchError((error) => of(InventoryActions.updateQuantityFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  deleteEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InventoryActions.deleteEntry),
      mergeMap(({ id }) =>
        this.inventoryService.remove(id).pipe(
          map(() => InventoryActions.deleteEntrySuccess({ id })),
          catchError((error) => of(InventoryActions.deleteEntryFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}