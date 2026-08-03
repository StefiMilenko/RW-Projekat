import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Item } from '../models/item.model';

export interface ItemState extends EntityState<Item> {
  loading: boolean;
  error: string | null;
}

export const itemAdapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const initialItemState: ItemState = itemAdapter.getInitialState({
  loading: false,
  error: null,
});