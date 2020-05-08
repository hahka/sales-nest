import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Market } from '../../models/market.entity';
import { MarketDTO } from '../../dto/market.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MarketsService {
    constructor(@InjectRepository(Market) private readonly repo: Repository<Market>) { }

  public async getAll() {
    return await this.repo.find();
  }

  public async create(dto: MarketDTO) {
    return this.repo.save(dto.toEntity());
  }
}
