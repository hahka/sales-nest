import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';
import { Market } from '../models/market.entity';
import { BaseDTO } from '../shared/base.dto';

export class MarketDTO extends BaseDTO implements Readonly<MarketDTO> {
  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  name: string;

  @ApiProperty({ required: true })
  @Min(0, { groups: ['post', 'patch'] })
  marketOrder: number;

  public toEntity() {
    const market = new Market();
    market.name = this.name;
    market.marketOrder = this.marketOrder;
    return market;
  }

  static columnsSortBlacklist() {
    return ['market_order'];
  }
}
