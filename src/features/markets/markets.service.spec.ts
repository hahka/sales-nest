import { Test, TestingModule } from '@nestjs/testing';
import { MarketsService } from './markets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Market } from 'src/models/market.entity';
import { RepositoryFake } from 'test/repository.mock';

describe('MarketsService', () => {
  let service: MarketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketsService,
        {
          provide: getRepositoryToken(Market),
          useClass: RepositoryFake,
        },
      ],
    }).compile();

    service = module.get<MarketsService>(MarketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
