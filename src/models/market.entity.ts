import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'market' })
export class Market extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  name: string;
}