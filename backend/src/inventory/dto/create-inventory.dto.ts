import { IsInt, IsOptional } from 'class-validator';

export class CreateInventoryDto {
    @IsInt()
    playerId!: number;

    @IsInt()
    itemId!: number;

    @IsOptional()
    @IsInt()
    quantity?: number;
}
