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
import { SortOrder } from '../../shared/types/sort-order.enum';

@Controller('market-sales')
export class MarketSalesController {
  constructor(private marketSalesService: MarketSalesService) {}

  @Get()
  public async getAll() {
    return await this.marketSalesService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return await this.marketSalesService.getById(id);
  }

  @Post()
  public async post(
    @Body(new CustomValidationPipe(['post']))
    dto: MarketSalesDTO[],
  ) {
    return await this.marketSalesService.synchronize(dto).catch(err => {
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
    return await this.marketSalesService.search(dto, {
      column: 'start_date',
      order: SortOrder.ASC,
    });
  }
}
