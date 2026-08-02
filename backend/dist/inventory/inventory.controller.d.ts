import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(createInventoryDto: CreateInventoryDto): Promise<import("./entities/inventory.entity").InventoryItem>;
    findAll(): Promise<import("./entities/inventory.entity").InventoryItem[]>;
    findOne(id: string): Promise<import("./entities/inventory.entity").InventoryItem>;
    update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<import("./entities/inventory.entity").InventoryItem>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
