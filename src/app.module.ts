import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { MarketsModule } from './features/markets/markets.module';
import { ProductsModule } from './features/products/products.module';
import { StockModule } from './features/stock/stock.module';
import { MarketSalesModule } from './features/market-sales/market-sales.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MarketsModule,
    ProductsModule,
    StockModule,
    MarketSalesModule,
  ],
})
export class AppModule {}
