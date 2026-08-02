import { Repository } from 'typeorm';
import { InventoryItem } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoryService {
    private repo;
    constructor(repo: Repository<InventoryItem>);
    create(createInventoryDto: CreateInventoryDto): Promise<InventoryItem>;
    findAll(): Promise<InventoryItem[]>;
    findOne(id: number): Promise<InventoryItem>;
    update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<InventoryItem>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
