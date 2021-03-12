import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from '../../models/product.entity';
import { Repository } from 'typeorm';
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

  public async getFull(): Promise<Product[]> {
    return await this.repo
      .createQueryBuilder('product')
      .orderBy('product.product_order', 'ASC')
      .addSelect('product.image')
      .getMany();
  }

  public async getImage(id: string): Promise<string | undefined> {
    const products = await this.repo
      .createQueryBuilder('product')
      .whereInIds([id])
      .addSelect('product.image')
      .getOne();
    return products?.image;
  }

  protected async findAndCount(
    keyword: string,
    sort: ApiSort,
    take: number,
    skip: number,
  ) {
    const query = this.repo
      .createQueryBuilder()
      .where('LOWER(name) LIKE :name', { name: `%${keyword.toLowerCase()}%` })
      .orderBy(
        this.getSortString(sort, ProductDTO.columnsSortBlacklist()),
        sort.order,
      );
    const count = await query.getCount();
    const test = await query
      .skip(skip)
      .take(take)
      .getMany();
    return [test, count];
  }
}
