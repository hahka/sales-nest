import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, IsBase64 } from 'class-validator';
import { Product } from '../models/product.entity';
import { PRODUCT_CATEGORY } from '../utils/product-category.enum';

export class ProductDTO implements Readonly<ProductDTO> {
  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  name: string;

  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  category: PRODUCT_CATEGORY;

  @ApiProperty({ required: true })
  @Min(0, { groups: ['post', 'patch'] })
  price: number;

  @ApiProperty()
  @IsBase64({ groups: ['post', 'patch'] })
  image: string;

  public toEntity() {
    const product = new Product();
    product.name = this.name;
    product.category = this.category;
    product.price = this.price;
    product.image = this.image;
    return product;
  }
}
