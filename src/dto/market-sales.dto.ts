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
import { Sale } from '../models/sale.entity';
import { BaseDTO } from '../shared/base.dto';
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

export class MarketSalesDTO extends BaseDTO
  implements Readonly<MarketSalesDTO> {
  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  marketId: string;

  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  marketName: string;

  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  startDate: string;

  @ApiProperty()
  @IsOptional({ groups: ['post', 'patch'] })
  @IsString({ groups: ['post', 'patch'] })
  endDate?: string;

  @ApiProperty({ required: true })
  @IsArray({ groups: ['post', 'patch'] })
  categories: PRODUCT_CATEGORY[];

  @IsArray({ groups: ['post', 'patch'] })
  @ValidateNested({ groups: ['post', 'patch'] })
  @Type(() => SaleDTO)
  sales: SaleDTO[];

  @Min(0, { groups: ['post', 'patch'] })
  @IsOptional({ groups: ['post', 'patch'] })
  @Type(() => SaleDTO)
  income: number;

  constructor(obj?: MarketSalesDTO) {
    super();
    Object.assign(this, obj);
  }

  public toEntity() {
    const marketSales = new MarketSales();
    marketSales.categories = this.categories;
    marketSales.marketId = this.marketId;
    marketSales.marketName = this.marketName;
    marketSales.sales = this.sales;
    marketSales.startDate = this.startDate;
    marketSales.endDate = this.endDate;
    marketSales.income =
      this.income ||
      [new Sale(), ...marketSales.sales]
        .map(sales =>
          [
            0,
            ...(sales && sales.items ? sales.items : []).map(
              item => item.price,
            ),
          ].reduce((acc, val) => {
            return acc + val - sales.discount;
          }),
        )
        .reduce((acc, val) => acc + val);
    return marketSales;
  }

  static columnsSortBlacklist() {
    return ['start_date', 'income'];
  }
}
