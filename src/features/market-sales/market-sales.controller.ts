import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MarketSalesService } from './market-sales.service';
import { CustomValidationPipe } from '../../shared/pipes/validation.pipe';
import SearchDto from '../../dto/search.dto';
import { MarketSalesDTO } from '../../dto/market-sales.dto';

@Controller('market-sales')
export class MarketSalesController {
  constructor(private marketsService: MarketSalesService) {}

  @Get()
  public async getAll() {
    return await this.marketsService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return await this.marketsService.getById(id);
  }

  @Post()
  public async post(
    @Body(new CustomValidationPipe(['post']))
    dto: MarketSalesDTO[],
  ) {
    return await this.marketsService.synchronize(dto).catch(err => {
      throw new HttpException(
        {
          code: err.code,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Post('/search')
  public async search(
    @Body(new CustomValidationPipe([]))
    dto: SearchDto,
  ) {
    return await this.marketsService.search(dto);
  }
}
