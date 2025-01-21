"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSeriesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const moment = require("moment");
let TimeSeriesService = class TimeSeriesService {
    constructor(httpService) {
        this.httpService = httpService;
        this.apiKey = 'demo';
        this.baseUrl = 'https://www.alphavantage.co/query';
    }
    async fetchHistoricalData(company, year) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.baseUrl, {
                params: {
                    function: 'TIME_SERIES_DAILY_ADJUSTED',
                    symbol: company,
                    apikey: this.apiKey,
                },
            }));
            const timeSeries = response.data['Time Series (Daily)'];
            if (!timeSeries) {
                return { message: 'No Data Found.' };
            }
            const filteredData = Object.keys(timeSeries)
                .filter((date) => moment(date).isBetween(`${year}-01-01`, `${year}-12-31`, 'day', '[]'))
                .reduce((acc, date) => {
                acc[date] = timeSeries[date];
                return acc;
            }, {});
            return filteredData;
        }
        catch (error) {
            throw new Error('Error fetching historical data: ' + error.message);
        }
    }
};
exports.TimeSeriesService = TimeSeriesService;
exports.TimeSeriesService = TimeSeriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TimeSeriesService);
//# sourceMappingURL=time-series.service.js.map