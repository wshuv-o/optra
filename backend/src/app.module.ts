import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AbModule } from './ab/ab.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { BlacklistService } from './blacklist/blacklist.service';
import { SignupModule } from './signup/signup.module';
import { SignupController } from './signup/signup.controller';
import { SignupService } from './signup/signup.service';
import { TempSignupDataService } from './signup/temp-signup-data.service';
import { BlogModule } from './blog/blog.module';
import { PostModule } from './post/post.module';
import { TimeSeriesController } from './time-series/time-series.controller';
import { TimeSeriesService } from './time-series/time-series.service';
import { TimeSeriesModule } from './time-series/time-series.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ChatbotService } from './chatbot/chatbot.service';
import { ChatbotModule } from './chatbot/chatbot.module';
import { UploadModule } from './upload/upload.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [AbModule, AuthModule, DatabaseModule, SignupModule, BlogModule, PostModule, TimeSeriesModule, ChatbotModule, HttpModule, UploadModule],
  controllers: [AppController, SignupController],
  providers: [AppService, BlacklistService, SignupService, TempSignupDataService, ChatbotService],
})
export class AppModule {}
