import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MarketsService } from './markets.service';
import { MarketDTO } from '../../dto/market.dto';
import { CustomValidationPipe } from '../../shared/pipes/validation.pipe';
import SearchDto from '../../dto/search.dto';

@Controller('markets')
export class MarketsController {
  constructor(private marketsService: MarketsService) {}

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
    dto: MarketDTO,
  ) {
    return await this.marketsService.create(dto).catch(err => {
      throw new HttpException(
        {
          code: err.code,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Patch('/:id')
  public async patch(
    @Param('id') id: string,
    @Body(new CustomValidationPipe(['patch']))
    dto: MarketDTO,
  ) {
    return await this.marketsService.patch(id, dto).catch(err => {
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
