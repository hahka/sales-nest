import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Stock } from '../../models/stock.entity';
import { StockDTO } from '../../dto/stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock) protected readonly repo: Repository<Stock>,
  ) {}

  public async getStock(): Promise<Stock> {
    const dbEntries = await this.repo.find();
    return dbEntries[0];
  }

  public async putStock(dto: StockDTO) {
    const dbEntries = await this.repo.find();
    const stock = dbEntries[0];
    if (!stock) {
      return this.repo.save(dto.toEntity());
    } else {
      return this.repo.save({ ...stock, ...dto.toEntity() });
    }
  }
}
