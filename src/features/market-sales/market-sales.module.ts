import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketSales } from '../../models/market-sales.entity';
import { MarketSalesController } from './market-sales.controller';
import { MarketSalesService } from './market-sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([MarketSales])],
  controllers: [MarketSalesController],
  providers: [MarketSalesService],
})
export class MarketSalesModule {}
