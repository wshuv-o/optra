import { Test, TestingModule } from '@nestjs/testing';
import { TimeSeriesController } from './time-series.controller';

describe('TimeSeriesController', () => {
  let controller: TimeSeriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeSeriesController],
    }).compile();

    controller = module.get<TimeSeriesController>(TimeSeriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
