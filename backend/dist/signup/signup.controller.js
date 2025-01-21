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
exports.SignupController = void 0;
const common_1 = require("@nestjs/common");
const signup_service_1 = require("./signup.service");
const public_decorator_1 = require("../auth/public.decorator");
let SignupController = class SignupController {
    constructor(signupService) {
        this.signupService = signupService;
    }
    async signUp(body) {
        const { name, email, password, confirm_pass } = body;
        if (!name || !email) {
            throw new common_1.BadRequestException('Name and email are required');
        }
        if (password != confirm_pass) {
            throw new common_1.BadRequestException('Password Confirmation error');
        }
        return this.signupService.initiateSignUp(name, email, password);
    }
    async verifyOtp(body) {
        const { email, otp } = body;
        if (!email || !otp) {
            throw new common_1.BadRequestException('Email and OTP are required');
        }
        return this.signupService.verifyOtp(email, otp);
    }
};
exports.SignupController = SignupController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SignupController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SignupController.prototype, "verifyOtp", null);
exports.SignupController = SignupController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [signup_service_1.SignupService])
], SignupController);
//# sourceMappingURL=signup.controller.js.map