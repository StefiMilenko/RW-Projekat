import { Item } from "../../items/entities/item.entity";
import { Player } from "../../player/entities/player.entity";
export declare class InventoryItem {
    id: number;
    quantity: number;
    player: Player;
    item: Item;
}
