import { InventoryItem } from 'src/inventory/entities/inventory.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn() id!: number;
  @Column() name!: string;
  @Column('float') basePrice!: number;
  @Column('int', { default: 0 }) supply!: number;
  @Column('int', { default: 0 }) demand!: number;

  @OneToMany(() => InventoryItem, (inv) => inv.item)  // Nade se u vise inventories
  inventories!: InventoryItem[];
}
