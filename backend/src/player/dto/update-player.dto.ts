import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdatePlayerDto{
    @IsOptional()
    @IsNumber()
    gold?: number;
}
