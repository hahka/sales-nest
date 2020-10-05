import { Test, TestingModule } from '@nestjs/testing';
import { MarketSalesService } from './market-sales.service';

describe('MarketSalesService', () => {
  let service: MarketSalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketSalesService],
    }).compile();

    service = module.get<MarketSalesService>(MarketSalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
