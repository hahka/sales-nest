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
import { ProductsService } from './products.service';
import { CustomValidationPipe } from '../../shared/pipes/validation.pipe';
import SearchDto from '../../dto/search.dto';
import { ProductDTO } from '../../dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  public async getAll() {
    return await this.productsService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return await this.productsService.getById(id);
  }

  @Get('/:id/image')
  public async getImageById(@Param('id') id: string) {
    return await this.productsService.getImage(id);
  }

  @Post()
  public async post(
    @Body(new CustomValidationPipe(['post']))
    dto: ProductDTO,
  ) {
    return await this.productsService.create(dto).catch(err => {
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
    dto: ProductDTO,
  ) {
    return await this.productsService.patch(id, dto).catch(err => {
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
    return await this.productsService.search(dto);
  }
}
