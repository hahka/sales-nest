import { Column, Entity } from 'typeorm';
import { PRODUCT_CATEGORY } from '../utils/product-category.enum';
import { BaseEntity } from './base.entity';
import { Sale } from './sale.entity';

@Entity({ name: 'market-sales' })
export class MarketSales extends BaseEntity {
  @Column({ type: 'uuid' })
  marketId: string;

  @Column({ type: 'varchar', length: 300 })
  marketName: string;

  @Column({ type: 'enum', enum: PRODUCT_CATEGORY, array: true })
  categories: PRODUCT_CATEGORY[];

  @Column({ type: 'jsonb' })
  sales: Sale[];
}
