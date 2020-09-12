import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';
import { STOCK_CATEGORY } from '../utils/stock-category.enum';
import { StockItem } from '../models/stock-item.entity';

export class StockItemDTO implements Readonly<StockItemDTO> {
  @ApiProperty({ required: true })
  @IsString({ groups: ['put'] })
  productId: string;

  @ApiProperty({ required: true })
  @Min(0, { groups: ['put'] })
  quantity: number;

  @ApiProperty({ required: true })
  @IsString({ groups: ['put'] })
  category: STOCK_CATEGORY;

  public toEntity() {
    const stockItem = new StockItem();
    stockItem.productId = this.productId;
    stockItem.quantity = this.quantity;
    stockItem.category = this.category;
    return stockItem;
  }
}
