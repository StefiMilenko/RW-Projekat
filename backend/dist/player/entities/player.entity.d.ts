import { InventoryItem } from "../../inventory/entities/inventory.entity";
export declare class Player {
    id: number;
    username: string;
    passwordHash: string;
    gold: number;
    inventory: InventoryItem[];
}
