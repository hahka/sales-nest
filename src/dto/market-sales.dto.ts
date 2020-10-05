import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { MarketSales } from '../models/market-sales.entity';
import { PRODUCT_CATEGORY } from '../utils/product-category.enum';

export class SaleItemProductDTO implements Readonly<SaleItemProductDTO> {
  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  id: string;

  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  name: string;
}

export class SaleItemDTO implements Readonly<SaleItemDTO> {
  @ApiProperty({ required: true })
  @Min(0, { groups: ['post', 'patch'] })
  quantity: number;

  @ApiProperty({ required: true })
  @Min(0, { groups: ['post', 'patch'] })
  price: number;

  @IsObject({ groups: ['post', 'patch'] })
  @ValidateNested({ groups: ['post', 'patch'] })
  @Type(() => SaleItemProductDTO)
  product: SaleItemProductDTO;
}

export class SaleDTO implements Readonly<SaleDTO> {
  @ApiProperty({ required: true })
  @IsDateString({ groups: ['post', 'patch'] })
  date: string;

  @ApiProperty({ required: true })
  @Min(0, { groups: ['post', 'patch'] })
  @IsOptional({ groups: ['post', 'patch'] })
  discount: number;

  @IsArray({ groups: ['post', 'patch'] })
  @ValidateNested({ groups: ['post', 'patch'] })
  @Type(() => SaleItemDTO)
  items: SaleItemDTO[];
}

export class MarketSalesDTO implements Readonly<MarketSalesDTO> {
  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  marketId: string;

  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  marketName: string;

  @ApiProperty({ required: true })
  @IsArray({ groups: ['post', 'patch'] })
  categories: PRODUCT_CATEGORY[];

  @IsArray({ groups: ['post', 'patch'] })
  @ValidateNested({ groups: ['post', 'patch'] })
  @Type(() => SaleDTO)
  sales: SaleDTO[];

  constructor(obj?: MarketSalesDTO) {
    Object.assign(this, obj);
  }

  public toEntity() {
    const marketSales = new MarketSales();
    marketSales.categories = this.categories;
    marketSales.marketId = this.marketId;
    marketSales.marketName = this.marketName;
    marketSales.sales = this.sales;
    return marketSales;
  }
}
