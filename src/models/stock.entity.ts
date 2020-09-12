import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StockItem } from './stock-item.entity';

@Entity({ name: 'stock' })
export class Stock extends BaseEntity {
  @Column({ type: 'jsonb' })
  stock: StockItem[];

  @Column({ type: 'timestamp' })
  lastUpdate: string;
}
