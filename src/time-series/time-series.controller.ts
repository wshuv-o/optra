import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { TimeSeriesService } from './time-series.service';
import { Public } from 'src/auth/public.decorator';

@Controller('time-series')
export class TimeSeriesController {
  constructor(private readonly timeSeriesService: TimeSeriesService) {}

  @Get('historical-data')
  @Public()
  async getHistoricalData(
    @Query('company') company: string,
    @Query('year') year: string,
  ) {
    if (!company || !year) {
      return {message: 'Company name and year are required.'};
    }
    const data = await this.timeSeriesService.fetchHistoricalData(company, year);
    return { company, year, data };
  }
}
