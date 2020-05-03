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

  public static from(dto: Partial<MarketDTO>) {
    const it = new MarketDTO();
    it.id = dto.id;
    it.name = dto.name;
    return it;
  }

  public static fromEntity(entity: Market) {
    return this.from({
      id: entity.id,
      name: entity.name
    });
  }

  public toEntity() {
    const market = new Market();
    market.id = this.id;
    market.name = this.name;
    return market;
  }
}