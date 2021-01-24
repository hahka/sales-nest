import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, IsBase64, IsOptional } from 'class-validator';
import { Product } from '../models/product.entity';
import { BaseDTO } from '../shared/base.dto';
import { PRODUCT_CATEGORY } from '../utils/product-category.enum';

export class ProductDTO extends BaseDTO implements Readonly<ProductDTO> {
  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  name: string;

  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  category: PRODUCT_CATEGORY;

  @ApiProperty({ required: true })
  @Min(0, { groups: ['post', 'patch'] })
  price: number;

  @ApiProperty({ required: true })
  @Min(0, { groups: ['post', 'patch'] })
  productOrder: number;

  @ApiProperty()
  @IsBase64({ groups: ['post', 'patch'] })
  @IsOptional({ groups: ['post', 'patch'] })
  image: string;

  public toEntity() {
    const product = new Product();
    product.name = this.name;
    product.category = this.category;
    product.price = this.price;
    product.image = this.image;
    product.productOrder = this.productOrder;
    return product;
  }

  static columnsSortBlacklist() {
    return ['product_order'];
  }
}
