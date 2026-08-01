import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from 'src/items/entities/item.entity';
import { Player } from 'src/player/entities/player.entity';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn() id!: number;
  @Column('int') quantity!: number;

  @ManyToOne(() => Player, (p) => p.inventory)
  player!: Player;

  @ManyToOne(() => Item, (i) => i.inventories)
  item!: Item;
}
