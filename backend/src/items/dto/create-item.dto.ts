export class CreateItemDto {
  name!: string;
  basePrice!: number;
  supply?: number;
  demand?: number;
}
