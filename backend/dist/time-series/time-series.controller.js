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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSeriesController = void 0;
const common_1 = require("@nestjs/common");
const time_series_service_1 = require("./time-series.service");
const public_decorator_1 = require("../auth/public.decorator");
let TimeSeriesController = class TimeSeriesController {
    constructor(timeSeriesService) {
        this.timeSeriesService = timeSeriesService;
    }
    async getHistoricalData(company, year) {
        if (!company || !year) {
            return { message: 'Company name and year are required.' };
        }
        const data = await this.timeSeriesService.fetchHistoricalData(company, year);
        return { company, year, data };
    }
};
exports.TimeSeriesController = TimeSeriesController;
__decorate([
    (0, common_1.Get)('historical-data'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Query)('company')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimeSeriesController.prototype, "getHistoricalData", null);
exports.TimeSeriesController = TimeSeriesController = __decorate([
    (0, common_1.Controller)('time-series'),
    __metadata("design:paramtypes", [time_series_service_1.TimeSeriesService])
], TimeSeriesController);
//# sourceMappingURL=time-series.controller.js.map