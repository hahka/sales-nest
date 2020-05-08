import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { MarketsService } from './markets.service';
import { MarketDTO } from '../../dto/market.dto';

@Controller('markets')
export class MarketsController {
    constructor(private serv: MarketsService) { }

    @Get()
    public async getAll() {
      return await this.serv.getAll();
    }

    @Post()
    public async create(@Body(new ValidationPipe({transform: true})) dto: MarketDTO) {
      return await this.serv.create(dto);
    }
}
