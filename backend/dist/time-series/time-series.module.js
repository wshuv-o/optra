"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSeriesModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const time_series_controller_1 = require("./time-series.controller");
const time_series_service_1 = require("./time-series.service");
let TimeSeriesModule = class TimeSeriesModule {
};
exports.TimeSeriesModule = TimeSeriesModule;
exports.TimeSeriesModule = TimeSeriesModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [time_series_controller_1.TimeSeriesController],
        providers: [time_series_service_1.TimeSeriesService],
    })
], TimeSeriesModule);
//# sourceMappingURL=time-series.module.js.map