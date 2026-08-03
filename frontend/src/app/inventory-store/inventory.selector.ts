import { createFeatureSelector, createSelector } from '@ngrx/store';
import { inventoryAdapter, InventoryState } from './inventory.state';

export const selectInventoryState = createFeatureSelector<InventoryState>('inventory');
export const { selectAll: selectAllInventory } = inventoryAdapter.getSelectors(selectInventoryState);
export const selectInventoryLoading = createSelector(selectInventoryState, (s) => s.loading);