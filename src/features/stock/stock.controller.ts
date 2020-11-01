import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CustomValidationPipe } from '../../shared/pipes/validation.pipe';
import { StockDTO } from '../../dto/stock.dto';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get()
  public async getStock() {
    return await this.stockService.getStock();
  }

  @Put()
  public async put(
    @Body(new CustomValidationPipe(['put']))
    dto: StockDTO,
  ) {
    return await this.stockService.putStock(dto).catch(err => {
      throw new HttpException(
        {
          code: err.code,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
