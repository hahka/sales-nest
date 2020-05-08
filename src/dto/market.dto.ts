import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Market } from '../models/market.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

export class MarketDTO implements Readonly<MarketDTO> {
  @PrimaryGeneratedColumn()
  id: string;


  @ApiProperty({ required: true })
  @IsString()
  name: string;

  public toEntity() {
    const market = new Market();
    market.id = this.id;
    market.name = this.name;
    return market;
  }
}