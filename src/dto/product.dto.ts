import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Product } from '../models/product.entity';

export class ProductDTO implements Readonly<ProductDTO> {
  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  name: string;

  public toEntity() {
    const product = new Product();
    product.name = this.name;
    return product;
  }
}
