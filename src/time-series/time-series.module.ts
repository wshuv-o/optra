import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TimeSeriesController } from './time-series.controller';
import { TimeSeriesService } from './time-series.service';

@Module({
  imports: [HttpModule],
  controllers: [TimeSeriesController],
  providers: [TimeSeriesService],
})
export class TimeSeriesModule {}
