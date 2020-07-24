import { Test, TestingModule } from '@nestjs/testing';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Market } from 'src/models/market.entity';
import { RepositoryFake } from 'test/repository.mock';
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
        {
          provide: getRepositoryToken(Market),
          useClass: RepositoryFake,
        },
      ],
    }).compile();

    controller = module.get<MarketsController>(MarketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
