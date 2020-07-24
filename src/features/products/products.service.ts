import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from '../../models/product.entity';
import { Repository, Like } from 'typeorm';
import { ApiSort } from '../../shared/types/api-sort.model';
import { BaseService } from '../../shared/base.service';
import { ProductDTO } from '../../dto/product.dto';

@Injectable()
export class ProductsService extends BaseService<Product, ProductDTO> {
  constructor(
    @InjectRepository(Product) protected readonly repo: Repository<Product>,
  ) {
    super();
  }

  public async getImage(id: string): Promise<string | undefined> {
    const products = await this.repo.query(
      `SELECT image FROM product WHERE product.id = $1`,
      [id],
    );
    return products[0].image;
  }

  protected findAndCount(
    keyword: string,
    sort: ApiSort,
    take: number,
    skip: number,
  ) {
    return this.repo.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      order: { [`${sort.column}`]: sort.order },
      take,
      skip,
    });
  }
}
