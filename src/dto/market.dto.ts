import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Market } from '../models/market.entity';

export class MarketDTO implements Readonly<MarketDTO> {
  @ApiProperty({ required: true })
  @IsString({ groups: ['post', 'patch'] })
  name: string;

  public toEntity() {
    const market = new Market();
    market.name = this.name;
    return market;
  }
}
