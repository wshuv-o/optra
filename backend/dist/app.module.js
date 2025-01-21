"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const ab_module_1 = require("./ab/ab.module");
const auth_module_1 = require("./auth/auth.module");
const database_module_1 = require("./database/database.module");
const blacklist_service_1 = require("./blacklist/blacklist.service");
const signup_module_1 = require("./signup/signup.module");
const signup_controller_1 = require("./signup/signup.controller");
const signup_service_1 = require("./signup/signup.service");
const temp_signup_data_service_1 = require("./signup/temp-signup-data.service");
const blog_module_1 = require("./blog/blog.module");
const post_module_1 = require("./post/post.module");
const time_series_module_1 = require("./time-series/time-series.module");
const axios_1 = require("@nestjs/axios");
const chatbot_service_1 = require("./chatbot/chatbot.service");
const chatbot_module_1 = require("./chatbot/chatbot.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [ab_module_1.AbModule, auth_module_1.AuthModule, database_module_1.DatabaseModule, signup_module_1.SignupModule, blog_module_1.BlogModule, post_module_1.PostModule, time_series_module_1.TimeSeriesModule, chatbot_module_1.ChatbotModule, axios_1.HttpModule],
        controllers: [app_controller_1.AppController, signup_controller_1.SignupController],
        providers: [app_service_1.AppService, blacklist_service_1.BlacklistService, signup_service_1.SignupService, temp_signup_data_service_1.TempSignupDataService, chatbot_service_1.ChatbotService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map