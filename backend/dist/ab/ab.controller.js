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
exports.AbController = void 0;
const common_1 = require("@nestjs/common");
const ab_service_1 = require("./ab.service");
const ab_dto_1 = require("./ab.dto");
const ab_dto_2 = require("./ab.dto");
const public_decorator_1 = require("../auth/public.decorator");
let AbController = class AbController {
    constructor(abService) {
        this.abService = abService;
    }
    async logout(body) {
        console.log(body.id);
        return this.abService.logout(body.id);
    }
    async updateCompany(id, updateCompanyDto) {
        return this.abService.updateCompany(id, updateCompanyDto);
    }
    async getAllCompanies() {
        return this.abService.getAllCompanies();
    }
    async getCompanyById(id) {
        return this.abService.getCompanyById(id);
    }
    async searchCompaniesByName(name) {
        return this.abService.searchCompaniesByName(name);
    }
    async searchInvestorsByName(name) {
        return this.abService.searchInvestorsByName(name);
    }
    async createPitchDeck(companyId, createPitchDeckDto) {
        return this.abService.createPitchDeck(companyId, createPitchDeckDto);
    }
    async getPitchDecksByCompany(companyId) {
        return this.abService.getPitchDecksByCompany(companyId);
    }
    async getInvestmentsByPitchDeck(pitchDeckId) {
        return this.abService.getInvestmentsByPitchDeck(pitchDeckId);
    }
    async deleteCompany(id) {
        return this.abService.deleteCompany(id);
    }
    async addInvestor(createInvestorDto) {
        return await this.abService.addInvestor(createInvestorDto);
    }
    async addInvestment(createInvestmentDto) {
        return await this.abService.addInvestment(createInvestmentDto);
    }
};
exports.AbController = AbController;
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "logout", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ab_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "updateCompany", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('companies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AbController.prototype, "getAllCompanies", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('companies/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "getCompanyById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('companies/search/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "searchCompaniesByName", null);
__decorate([
    (0, common_1.Get)('investors/search/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "searchInvestorsByName", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(':companyId/pitchdeck'),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ab_dto_1.CreatePitchDeckDto]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "createPitchDeck", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':companyId/pitchdecks'),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "getPitchDecksByCompany", null);
__decorate([
    (0, common_1.Get)('pitchdeck/:pitchDeckId/investments'),
    __param(0, (0, common_1.Param)('pitchDeckId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "getInvestmentsByPitchDeck", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "deleteCompany", null);
__decorate([
    (0, common_1.Post)('investors/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ab_dto_2.CreateInvestorDto]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "addInvestor", null);
__decorate([
    (0, common_1.Post)('investment/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ab_dto_1.CreateInvestmentDto]),
    __metadata("design:returntype", Promise)
], AbController.prototype, "addInvestment", null);
exports.AbController = AbController = __decorate([
    (0, common_1.Controller)('ab'),
    __metadata("design:paramtypes", [ab_service_1.AbService])
], AbController);
//# sourceMappingURL=ab.controller.js.map