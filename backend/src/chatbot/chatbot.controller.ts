// src/chatbase/chatbase.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  // Endpoint to handle message sending to Chatbase
  @Post('send-message')
  async sendMessage(
    @Body('message') message: string,  // Expecting a message from the body
    @Body('userId') userId: string,    // Expecting a user ID from the body
  ) {
    try {
      const response =  this.chatbotService.sendMessageToChatbase(message, userId);
      return response;
    } catch (error) {
      return { message: 'Failed to send message', error: error.message };
    }
  }
}
