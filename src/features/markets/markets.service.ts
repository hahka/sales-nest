import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Market } from '../../models/market.entity';
import { MarketDTO } from '../../dto/market.dto';
import { Repository, Like } from 'typeorm';
import { BaseService } from '../../shared/base.service';
import { ApiSort } from '../../shared/types/api-sort.model';

@Injectable()
export class MarketsService extends BaseService<Market, MarketDTO> {
  constructor(
    @InjectRepository(Market) protected readonly repo: Repository<Market>,
  ) {
    super();
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
