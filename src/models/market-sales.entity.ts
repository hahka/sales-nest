import { Column, Entity } from 'typeorm';
import { PRODUCT_CATEGORY } from '../utils/product-category.enum';
import { BaseEntity } from './base.entity';
import { Sale } from './sale.entity';

@Entity({ name: 'market-sales' })
export class MarketSales extends BaseEntity {
  @Column({ type: 'uuid', name: 'market_id' })
  marketId: string;

  @Column({ type: 'varchar', name: 'market_name', length: 300 })
  marketName: string;

  @Column({ type: 'enum', enum: PRODUCT_CATEGORY, array: true })
  categories: PRODUCT_CATEGORY[];

  @Column({ type: 'jsonb' })
  sales: Sale[];

  @Column({ type: 'timestamp', name: 'start_date' })
  startDate: string;

  @Column({ type: 'timestamp', name: 'end_date', nullable: true })
  endDate?: string;

  @Column({ type: 'real', default: 0 })
  income: number;
}
