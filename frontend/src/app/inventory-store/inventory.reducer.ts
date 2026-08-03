import { createReducer, on } from '@ngrx/store';
import { inventoryAdapter, initialInventoryState } from './inventory.state';
import { InventoryActions } from './inventory.actions';

export const inventoryReducer = createReducer(
  initialInventoryState,

  on(InventoryActions.loadInventory, (state) => ({ ...state, loading: true, error: null })),
  on(InventoryActions.loadInventorySuccess, (state, { entries }) =>
    inventoryAdapter.setAll(entries, { ...state, loading: false }),
  ),
  on(InventoryActions.loadInventoryFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(InventoryActions.updateQuantitySuccess, (state, { entry }) =>
    inventoryAdapter.updateOne({ id: entry.id, changes: entry }, state),
  ),
  on(InventoryActions.updateQuantityFailure, (state, { error }) => ({ ...state, error })),

  on(InventoryActions.deleteEntrySuccess, (state, { id }) => inventoryAdapter.removeOne(id, state)),
  on(InventoryActions.deleteEntryFailure, (state, { error }) => ({ ...state, error })),
);