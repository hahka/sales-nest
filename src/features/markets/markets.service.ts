import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Market } from '../../models/market.entity';
import { Repository } from 'typeorm';
import { MarketDTO } from '../../dto/market.dto';

@Injectable()
export class MarketsService {
    constructor(@InjectRepository(Market) private readonly repo: Repository<Market>) { }

  public async getAll() {
    return await this.repo.find();
  }

  public async create(dto: MarketDTO) {
    return this.repo.save(dto.toEntity())
      .then(e => MarketDTO.fromEntity(e));
  }
}
