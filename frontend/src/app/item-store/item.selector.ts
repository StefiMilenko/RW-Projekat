import { createFeatureSelector, createSelector } from '@ngrx/store';
import { itemAdapter, ItemState } from './item.state';

export const selectItemState = createFeatureSelector<ItemState>('items');

export const { selectAll: selectAllItems } = itemAdapter.getSelectors(selectItemState);

export const selectItemsLoading = createSelector(selectItemState, (s) => s.loading);
export const selectItemsError = createSelector(selectItemState, (s) => s.error);