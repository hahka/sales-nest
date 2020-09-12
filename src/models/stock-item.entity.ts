import { Column } from 'typeorm';
import { STOCK_CATEGORY } from '../utils/stock-category.enum';

export class StockItem {
  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column({ type: 'enum', enum: STOCK_CATEGORY })
  category: STOCK_CATEGORY;
}
