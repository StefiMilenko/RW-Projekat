import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { InventoryItem } from '../models/inventory.model';

export interface InventoryState extends EntityState<InventoryItem> {
  loading: boolean;
  error: string | null;
}

export const inventoryAdapter: EntityAdapter<InventoryItem> = createEntityAdapter<InventoryItem>();

export const initialInventoryState: InventoryState = inventoryAdapter.getInitialState({
  loading: false,
  error: null,
});