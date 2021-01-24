import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from '../../shared/base.service';
import { ApiSort } from '../../shared/types/api-sort.model';
import { MarketSales } from '../../models/market-sales.entity';
import { MarketSalesDTO } from '../../dto/market-sales.dto';

@Injectable()
export class MarketSalesService extends BaseService<
  MarketSales,
  MarketSalesDTO
> {
  constructor(
    @InjectRepository(MarketSales)
    protected readonly repo: Repository<MarketSales>,
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
      .where('LOWER(market_name) LIKE :marketName', {
        marketName: `%${keyword.toLowerCase()}%`,
      })
      .orderBy(this.getSortString(sort), sort.order);
    const count = await query.getCount();
    const test = await query
      .skip(skip)
      .take(take)
      .getMany();
    return [test, count];
  }

  public async synchronize(dto: MarketSalesDTO[]) {
    return this.repo.save(dto.map(data => new MarketSalesDTO(data).toEntity()));
  }
}
