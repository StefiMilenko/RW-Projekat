import { InventoryItem } from "./inventory.model";

export interface Player {
  id: number;
  username: string;
  gold: number;
  inventory?: InventoryItem[];
}