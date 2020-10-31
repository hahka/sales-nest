import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PRODUCT_CATEGORY } from '../utils/product-category.enum';

@Entity({ name: 'product' })
@Unique(['name'])
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'real' })
  price: number;

  @Column({ type: 'text', select: false, nullable: true })
  image: string;

  @Column({ type: 'enum', enum: PRODUCT_CATEGORY })
  category: PRODUCT_CATEGORY;

  @Column({ type: 'integer' })
  order: number;
}
