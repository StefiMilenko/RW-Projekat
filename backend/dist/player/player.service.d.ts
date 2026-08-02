import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
export declare class PlayerService {
    private repo;
    constructor(repo: Repository<Player>);
    create(createPlayerDto: CreatePlayerDto): string;
    findAll(): Promise<Player[]>;
    findOne(id: number): Promise<Player>;
    update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
