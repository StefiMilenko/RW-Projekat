import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InventoryItem } from '../models/inventory.model';

export const InventoryActions = createActionGroup({
  source: 'Inventory',
  events: {
    'Load Inventory': emptyProps(),
    'Load Inventory Success': props<{ entries: InventoryItem[] }>(),
    'Load Inventory Failure': props<{ error: string }>(),

    'Update Quantity': props<{ id: number; quantity: number }>(),
    'Update Quantity Success': props<{ entry: InventoryItem }>(),
    'Update Quantity Failure': props<{ error: string }>(),

    'Delete Entry': props<{ id: number }>(),
    'Delete Entry Success': props<{ id: number }>(),
    'Delete Entry Failure': props<{ error: string }>(),
  },
});