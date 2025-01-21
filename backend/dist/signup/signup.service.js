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
exports.SignupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nodemailer = require("nodemailer");
const database_entity_1 = require("../database/database.entity");
const temp_signup_data_service_1 = require("./temp-signup-data.service");
let SignupService = class SignupService {
    constructor(IRepo, tempSignupDataService) {
        this.IRepo = IRepo;
        this.tempSignupDataService = tempSignupDataService;
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    async initiateSignUp(name, email, password) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.tempSignupDataService.set(email, { name, email, password, otp });
        const mailOptions = {
            from: "rizben410@gmail.com",
            to: email,
            subject: 'Your OTP Code',
            text: `Hello ${name},\n\nYour OTP is ${otp}. Please use this to complete your registration.\n\nThank you!`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            return { message: 'OTP sent successfully to email' };
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to send OTP');
        }
    }
    async verifyOtp(email, otp) {
        const tempData = this.tempSignupDataService.get(email);
        if (!tempData) {
            throw new Error('No sign-up initiated for this email');
        }
        if (tempData.otp !== otp) {
            throw new Error('Invalid OTP');
        }
        await this.IRepo.save({
            name: tempData.name,
            email: tempData.email,
            password: tempData.password,
        });
        this.tempSignupDataService.delete(email);
        return { message: 'Sign-up successful', user: { name: tempData.name, email: tempData.email } };
    }
};
exports.SignupService = SignupService;
exports.SignupService = SignupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_entity_1.Companies)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        temp_signup_data_service_1.TempSignupDataService])
], SignupService);
//# sourceMappingURL=signup.service.js.map