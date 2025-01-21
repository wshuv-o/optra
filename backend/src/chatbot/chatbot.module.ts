// src/chatbase/chatbase.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';

@Module({
  imports: [HttpModule],
  providers: [ChatbotService],
//   exports: [ChatbotService],
  controllers: [ChatbotController],
})
export class ChatbotModule {}
