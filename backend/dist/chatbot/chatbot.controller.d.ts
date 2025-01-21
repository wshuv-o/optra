import { ChatbotService } from './chatbot.service';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    sendMessage(message: string, userId: string): Promise<any>;
}
