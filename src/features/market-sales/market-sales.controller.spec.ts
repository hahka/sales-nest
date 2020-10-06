import { Test, TestingModule } from '@nestjs/testing';
import { MarketSalesController } from './market-sales.controller';

describe('MarketSales Controller', () => {
  let controller: MarketSalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketSalesController],
    }).compile();

    controller = module.get<MarketSalesController>(MarketSalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
