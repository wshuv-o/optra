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
exports.Investment = exports.PitchDeck = exports.Companies = void 0;
const typeorm_1 = require("typeorm");
const investor_entity_1 = require("./investor.entity");
let Companies = class Companies {
};
exports.Companies = Companies;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Companies.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Companies.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Companies.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Companies.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "market", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 300, nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "growth", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60, nullable: true }),
    __metadata("design:type", String)
], Companies.prototype, "launch_date", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PitchDeck, (pitchDeck) => pitchDeck.company),
    __metadata("design:type", Array)
], Companies.prototype, "pitchDecks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Investment, (investment) => investment.company),
    __metadata("design:type", Array)
], Companies.prototype, "investments", void 0);
exports.Companies = Companies = __decorate([
    (0, typeorm_1.Entity)()
], Companies);
let PitchDeck = class PitchDeck {
};
exports.PitchDeck = PitchDeck;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PitchDeck.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Companies, (company) => company.pitchDecks, { onDelete: 'CASCADE' }),
    __metadata("design:type", Companies)
], PitchDeck.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], PitchDeck.prototype, "valuation", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], PitchDeck.prototype, "funding", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], PitchDeck.prototype, "markup", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], PitchDeck.prototype, "pitch_date", void 0);
exports.PitchDeck = PitchDeck = __decorate([
    (0, typeorm_1.Entity)()
], PitchDeck);
let Investment = class Investment {
};
exports.Investment = Investment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Investment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => investor_entity_1.Investor, (investor) => investor.investments, { onDelete: 'CASCADE' }),
    __metadata("design:type", investor_entity_1.Investor)
], Investment.prototype, "investor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Companies, (company) => company.investments, { onDelete: 'CASCADE' }),
    __metadata("design:type", Companies)
], Investment.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Investment.prototype, "amount_invested", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Investment.prototype, "investment_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Investment.prototype, "comments", void 0);
exports.Investment = Investment = __decorate([
    (0, typeorm_1.Entity)()
], Investment);
//# sourceMappingURL=database.entity.js.map