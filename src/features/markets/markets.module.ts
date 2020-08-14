import { Module } from '@nestjs/common';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from '../../models/market.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Market])],
  controllers: [MarketsController],
  providers: [MarketsService]
})
export class MarketsModule {}
