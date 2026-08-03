import { createReducer, on } from '@ngrx/store';
import { itemAdapter, initialItemState } from './item.state';
import { ItemActions } from './item.actions';

export const itemReducer = createReducer(
  initialItemState,

  on(ItemActions.loadItems, (state) => ({ ...state, loading: true, error: null })),
  on(ItemActions.loadItemsSuccess, (state, { items }) =>
    itemAdapter.setAll(items, { ...state, loading: false }),
  ),
  on(ItemActions.loadItemsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ItemActions.updateItemSuccess, (state, { item }) =>
    itemAdapter.updateOne({ id: item.id, changes: item }, state),
  ),
  on(ItemActions.updateItemFailure, (state, { error }) => ({ ...state, error })),

  on(ItemActions.deleteItemSuccess, (state, { id }) => itemAdapter.removeOne(id, state)),
  on(ItemActions.deleteItemFailure, (state, { error }) => ({ ...state, error })),
);