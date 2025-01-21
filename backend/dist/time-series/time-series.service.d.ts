import { HttpService } from '@nestjs/axios';
export declare class TimeSeriesService {
    private readonly httpService;
    private readonly apiKey;
    private readonly baseUrl;
    constructor(httpService: HttpService);
    fetchHistoricalData(company: string, year: string): Promise<any>;
}
