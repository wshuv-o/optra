"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const signup_service_1 = require("./signup.service");
const signup_controller_1 = require("./signup.controller");
const temp_signup_data_service_1 = require("./temp-signup-data.service");
const database_entity_1 = require("../database/database.entity");
let SignupModule = class SignupModule {
};
exports.SignupModule = SignupModule;
exports.SignupModule = SignupModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([database_entity_1.Companies])],
        controllers: [signup_controller_1.SignupController],
        providers: [signup_service_1.SignupService, temp_signup_data_service_1.TempSignupDataService],
    })
], SignupModule);
//# sourceMappingURL=signup.module.js.map