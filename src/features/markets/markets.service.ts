import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Market } from '../../models/market.entity';
import { MarketDTO } from '../../dto/market.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(Market) private readonly repo: Repository<Market>,
  ) {}

  public async getAll(): Promise<Market[]> {
    return await this.repo.find();
  }

  public async create(dto: MarketDTO): Promise<Market> {
    return this.save(dto.toEntity());
  }

  public async patch(id: string, dto: MarketDTO): Promise<Market> {
    let entity = await this.repo.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    entity = { ...entity, ...dto.toEntity() };
    return this.save(entity);
  }

  private save(entity: Market) {
    return this.repo.save(entity);
  }
}
