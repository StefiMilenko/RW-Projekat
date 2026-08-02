import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name!: string;

  @IsNumber()
  basePrice!: number;

  @IsOptional()
  @IsNumber()
  supply?: number;

  @IsOptional()
  @IsNumber()
  demand?: number;
}
