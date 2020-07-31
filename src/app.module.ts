import { MarketsModule } from './features/markets/markets.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ProductsModule } from './features/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MarketsModule,
    ProductsModule,
  ],
})
export class AppModule {}
