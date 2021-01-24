import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'market' })
@Unique(['name'])
export class Market extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'integer', default: 1, name: 'market_order' })
  marketOrder: number;
}
