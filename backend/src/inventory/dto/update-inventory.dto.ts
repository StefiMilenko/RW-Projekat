import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto';
import { IsInt } from 'class-validator';

export class UpdateInventoryDto{
    @IsInt()
    quantity?: number;
}
