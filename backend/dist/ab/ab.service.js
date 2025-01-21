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
exports.AbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const database_entity_1 = require("../database/database.entity");
const database_entity_2 = require("../database/database.entity");
const database_entity_3 = require("../database/database.entity");
const investor_entity_1 = require("../database/investor.entity");
let AbService = class AbService {
    constructor(companiesRepo, pitchDeckRepo, investmentRepo, investorRepo) {
        this.companiesRepo = companiesRepo;
        this.pitchDeckRepo = pitchDeckRepo;
        this.investmentRepo = investmentRepo;
        this.investorRepo = investorRepo;
        this.dynamicSecrets = new Map();
    }
    async createCompany(createCompanyDto) {
        const company = this.companiesRepo.create(createCompanyDto);
        return this.companiesRepo.save(company);
    }
    async logout(userId) {
        console.log("logout: ", this.dynamicSecrets);
        if (this.dynamicSecrets.has(userId)) {
            this.dynamicSecrets.delete(userId);
            console.log("login: ", this.dynamicSecrets);
        }
        else {
            throw new common_1.NotFoundException('Session not found');
        }
    }
    async updateCompany(id, updateCompanyDto) {
        const company = await this.companiesRepo.findOne({ where: { id } });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        Object.assign(company, updateCompanyDto);
        return this.companiesRepo.save(company);
    }
    async getAllCompanies() {
        return this.companiesRepo.find();
    }
    async getCompanyById(id) {
        const company = await this.companiesRepo.findOne({ where: { id } });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        return company;
    }
    async searchCompaniesByName(name) {
        return this.companiesRepo.findBy({ name: (0, typeorm_2.Like)(`%${name}%`) });
    }
    async searchInvestorsByName(name) {
        return this.investorRepo.findBy({ full_name: (0, typeorm_2.Like)(`%${name}%`) });
    }
    async createPitchDeck(companyId, createPitchDeckDto) {
        const company = await this.companiesRepo.findOne({ where: { id: companyId } });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        const pitchDeck = this.pitchDeckRepo.create({ ...createPitchDeckDto, company });
        return this.pitchDeckRepo.save(pitchDeck);
    }
    async getPitchDecksByCompany(companyId) {
        const company = await this.companiesRepo.findOne({ where: { id: companyId }, relations: ['pitchDecks'] });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        return company.pitchDecks;
    }
    async getInvestmentsByPitchDeck(pitchDeckId) {
        const investments = await this.investmentRepo.find({ where: { id: pitchDeckId }, relations: ['investor'] });
        if (!investments)
            throw new common_1.NotFoundException('No investments found for this pitch deck');
        return investments;
    }
    async deleteCompany(id) {
        const result = await this.companiesRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Company not found');
    }
    async addInvestor(createInvestorDto) {
        const investor = this.investorRepo.create(createInvestorDto);
        return await this.investorRepo.save(investor);
    }
    async addInvestment(createInvestmentDto) {
        const { investorId, companyId, ...investmentData } = createInvestmentDto;
        const investor = await this.investorRepo.findOne({ where: { id: investorId } });
        if (!investor) {
            throw new Error('Investor not found');
        }
        const company = await this.companiesRepo.findOne({ where: { id: companyId } });
        if (!company) {
            throw new Error('Company not found');
        }
        const investment = this.investmentRepo.create({
            ...investmentData,
            investor,
            company,
        });
        return await this.investmentRepo.save(investment);
    }
};
exports.AbService = AbService;
exports.AbService = AbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_entity_1.Companies)),
    __param(1, (0, typeorm_1.InjectRepository)(database_entity_2.PitchDeck)),
    __param(2, (0, typeorm_1.InjectRepository)(database_entity_3.Investment)),
    __param(3, (0, typeorm_1.InjectRepository)(investor_entity_1.Investor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AbService);
//# sourceMappingURL=ab.service.js.map