import { HttpService } from '@nestjs/axios';
export declare class ChatbotService {
    private readonly httpService;
    private readonly chatbotId;
    private readonly apiKey;
    private readonly baseUrl;
    constructor(httpService: HttpService);
    sendMessageToChatbase(userMessage: string, userId: string): Promise<any>;
}
