// src/chatbase/chatbase.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChatbotService {
  private readonly chatbotId = 'oepM69ftOSHy4TTaJsXYv'; // Your Chatbot ID
  private readonly apiKey = 'YOUR_API_KEY'; // Your API key from Chatbase
  private readonly baseUrl = 'https://api.chatbase.co'; // Correct Chatbase API base URL

  constructor(private readonly httpService: HttpService) {}

  // Method to send message to Chatbase
  async sendMessageToChatbase(userMessage: string, userId: string) {
    const payload = {
      chatbotId: this.chatbotId,
      message: userMessage,
      userId: userId,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/sendMessage`, payload, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`, // Pass API key if needed
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Error communicating with Chatbase:', error.response?.data || error.message);
      throw error;
    }
  }
}
