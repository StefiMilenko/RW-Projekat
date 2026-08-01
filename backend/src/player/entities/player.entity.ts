import { InventoryItem } from 'src/inventory/entities/inventory.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ unique: true }) username!: string;
  @Column() passwordHash!: string;
  @Column('float', { default: 1000 }) gold!: number;

  @OneToMany(() => InventoryItem, (inv) => inv.player)
  inventory!: InventoryItem[];
}
