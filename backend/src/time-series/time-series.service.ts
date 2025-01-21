import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class TimeSeriesService {
  private readonly apiKey = 'demo'; // Replace with your API key
  private readonly baseUrl = 'https://www.alphavantage.co/query';

  constructor(private readonly httpService: HttpService) {}

  async fetchHistoricalData(company: string, year: string): Promise<any> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(this.baseUrl, {
          params: {
            function: 'TIME_SERIES_DAILY_ADJUSTED',
            symbol: company,
            apikey: this.apiKey,
          },
        }),
      );

      const timeSeries = response.data['Time Series (Daily)'];
      if (!timeSeries) {
        return {message: 'No Data Found.'};

      }

      const filteredData = Object.keys(timeSeries)
        .filter((date) =>
          moment(date).isBetween(`${year}-01-01`, `${year}-12-31`, 'day', '[]'),
        )
        .reduce((acc, date) => {
          acc[date] = timeSeries[date];
          return acc;
        }, {});

      return filteredData;
    } catch (error) {
      throw new Error('Error fetching historical data: ' + error.message);
    }
  }
}
