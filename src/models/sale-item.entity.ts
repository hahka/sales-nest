import { Column } from 'typeorm';

export class SaleItem {
  @Column({ type: 'real' })
  price: number;

  @Column({ type: 'real' })
  quantity: number;

  @Column({ type: 'jsonb' })
  product: {
    id: string;
    name: string;
  };
}
