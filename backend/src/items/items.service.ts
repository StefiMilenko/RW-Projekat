import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private repo: Repository<Item>) {}

  create(createItemDto: CreateItemDto) {
    const item = this.repo.create(createItemDto);
    return this.repo.save(item);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) { //Samo supply i demand
    await this.findOne(id);
    await this.repo.update(id, updateItemDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
