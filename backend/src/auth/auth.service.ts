import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Player } from 'src/player/entities/player.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player) private playerRepo: Repository<Player>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const player = this.playerRepo.create({ username, passwordHash });
    return this.playerRepo.save(player);
  }

  async validateUser(username: string, password: string) {
    const player = await this.playerRepo.findOneBy({ username });
    if (!player) throw new UnauthorizedException();
    const match = await bcrypt.compare(password, player.passwordHash);
    if (!match) throw new UnauthorizedException();
    return player;
  }

  async login(username: string, password: string) {
    const player = await this.validateUser(username, password);
    const payload = { sub: player.id, username: player.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
