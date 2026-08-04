import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Item } from '../models/item.model';

export const ItemActions = createActionGroup({
  source: 'Item',
  events: {
    'Create Item': props<{ name: string; basePrice: number; supply?: number; demand?: number }>(),
    'Create Item Success': props<{ item: Item }>(),
    'Create Item Failure': props<{ error: string }>(),
      
    'Load Items': emptyProps(),
    'Load Items Success': props<{ items: Item[] }>(),
    'Load Items Failure': props<{ error: string }>(),

    'Update Item': props<{ id: number; changes: Partial<Pick<Item, 'supply' | 'demand'>> }>(),
    'Update Item Success': props<{ item: Item }>(),
    'Update Item Failure': props<{ error: string }>(),

    'Delete Item': props<{ id: number }>(),
    'Delete Item Success': props<{ id: number }>(),
    'Delete Item Failure': props<{ error: string }>(),
  },
});