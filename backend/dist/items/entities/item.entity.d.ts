import { InventoryItem } from "../../inventory/entities/inventory.entity";
export declare class Item {
    id: number;
    name: string;
    basePrice: number;
    supply: number;
    demand: number;
    inventories: InventoryItem[];
}
