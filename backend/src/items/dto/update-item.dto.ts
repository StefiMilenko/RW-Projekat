import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateItemDto {
    @IsOptional()
    @IsNumber()
    supply?: number;

    @IsOptional()
    @IsNumber()
    demand?: number;
}
