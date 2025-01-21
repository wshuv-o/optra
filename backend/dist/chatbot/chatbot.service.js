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
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let ChatbotService = class ChatbotService {
    constructor(httpService) {
        this.httpService = httpService;
        this.chatbotId = 'oepM69ftOSHy4TTaJsXYv';
        this.apiKey = 'YOUR_API_KEY';
        this.baseUrl = 'https://api.chatbase.co';
    }
    async sendMessageToChatbase(userMessage, userId) {
        const payload = {
            chatbotId: this.chatbotId,
            message: userMessage,
            userId: userId,
        };
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.baseUrl}/sendMessage`, payload, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            }));
            return response.data;
        }
        catch (error) {
            console.error('Error communicating with Chatbase:', error.response?.data || error.message);
            throw error;
        }
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map