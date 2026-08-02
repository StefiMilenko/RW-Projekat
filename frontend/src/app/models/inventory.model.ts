import { Player } from './player.model';
import { Item } from './item.model';

export interface InventoryItem {
  id: number;
  quantity: number;
  player?: Player;
  item?: Item;
}