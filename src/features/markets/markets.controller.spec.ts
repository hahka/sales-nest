import { Test, TestingModule } from '@nestjs/testing';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';
import { BaseServiceMock } from '../../../test/base-service.mock';

describe('Markets Controller', () => {
  let controller: MarketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketsController],
      providers: [
        {
          provide: MarketsService,
          useClass: BaseServiceMock,
        },
      ],
    }).compile();

    controller = module.get<MarketsController>(MarketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
