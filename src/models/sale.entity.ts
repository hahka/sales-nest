import { Column } from 'typeorm';
import { SaleItem } from './sale-item.entity';

export class Sale {
  @Column({ type: 'timestamp' })
  date: string;

  @Column({ type: 'real' })
  discount: number;

  @Column({ type: 'jsonb' })
  items: SaleItem[];
}
