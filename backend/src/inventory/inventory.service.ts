import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem) private repo: Repository<InventoryItem>,
  ) {}

  create(createInventoryDto: CreateInventoryDto) {
    const entry = this.repo.create({
      player: { id: createInventoryDto.playerId } as any,
      item: { id: createInventoryDto.itemId } as any,
      quantity: createInventoryDto.quantity ?? 1,
    });
    return this.repo.save(entry);
  }

  findAll() {
    return this.repo.find({ relations: { player: true, item: true } });
  }

  async findOne(id: number) {
    const entry = await this.repo.findOne({
      where: { id },
      relations: { player: true, item: true },
    });
    if (!entry) throw new NotFoundException('Inventory entry not found');
    return entry;
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) { //Samo quantity
    await this.findOne(id);
    await this.repo.update(id, updateInventoryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
