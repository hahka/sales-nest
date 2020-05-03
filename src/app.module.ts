import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { MarketsModule } from './features/markets/markets.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), MarketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
