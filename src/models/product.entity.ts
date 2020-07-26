import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PRODUCT_CATEGORY } from '../utils/product-category.enum';

@Entity({ name: 'product' })
@Unique(['name'])
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'text', select: false })
  image: string;

  @Column({ type: 'text' })
  category: PRODUCT_CATEGORY;

  @Column({ type: 'int' })
  stockQuantity: number;
}
