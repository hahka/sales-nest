import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Market } from '../../models/market.entity';
import { MarketDTO } from '../../dto/market.dto';
import { Repository } from 'typeorm';
import { BaseService } from '../../shared/base.service';
import { ApiSort } from '../../shared/types/api-sort.model';

@Injectable()
export class MarketsService extends BaseService<Market, MarketDTO> {
  constructor(
    @InjectRepository(Market) protected readonly repo: Repository<Market>,
  ) {
    super();
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
      .orderBy(this.getSortString(sort), sort.order);
    const count = await query.getCount();
    const test = await query
      .skip(skip)
      .take(take)
      .getMany();
    return [test, count];
  }
}
