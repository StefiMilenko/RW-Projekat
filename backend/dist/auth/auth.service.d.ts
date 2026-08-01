import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Player } from "../player/entities/player.entity";
export declare class AuthService {
    private playerRepo;
    private jwtService;
    constructor(playerRepo: Repository<Player>, jwtService: JwtService);
    register(username: string, password: string): Promise<Player>;
    validateUser(username: string, password: string): Promise<Player>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
