import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Stock } from '../models/stock.entity';
import { BaseDTO } from '../shared/base.dto';
import { StockItemDTO } from './stock-item.dto';

export class StockDTO extends BaseDTO implements Readonly<StockDTO> {
  @ApiProperty({ required: true })
  @IsArray({ groups: ['put'] })
  @ValidateNested({ groups: ['put'] })
  @Type(() => StockItemDTO)
  stock: StockItemDTO[];

  public toEntity() {
    const stock = new Stock();
    stock.stock = this.stock;
    stock.lastUpdate = new Date().toISOString();
    return stock;
  }
}
