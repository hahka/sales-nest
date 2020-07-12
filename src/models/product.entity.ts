import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'product' })
@Unique(['name'])
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;
  @Column({ type: 'numeric' })
  price: number;
  @Column({ type: 'bytea' })
  image: string;
  @Column({ type: 'enum' })
  category: string;
}
