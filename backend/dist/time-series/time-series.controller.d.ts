import { TimeSeriesService } from './time-series.service';
export declare class TimeSeriesController {
    private readonly timeSeriesService;
    constructor(timeSeriesService: TimeSeriesService);
    getHistoricalData(company: string, year: string): Promise<{
        message: string;
        company?: undefined;
        year?: undefined;
        data?: undefined;
    } | {
        company: string;
        year: string;
        data: any;
        message?: undefined;
    }>;
}
