import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(@InjectRepository(Player) private repo: Repository<Player>) {}

  create(createPlayerDto: CreatePlayerDto) { //Ne treba da pravi igraca, to auth register radi
    return 'This action adds a new player';
  }

  findAll() {
    return this.repo.find({ relations: { inventory: { item: true } } });
  }

  async findOne(id: number) {
    const player = await this.repo.findOne({
      where: { id },
      relations: { inventory: { item: true } },
    });
    if (!player) throw new NotFoundException('Player not found');
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) { //Menja samo gold
    await this.findOne(id);
    await this.repo.update(id, updatePlayerDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}