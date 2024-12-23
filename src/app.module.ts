import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AbModule } from './ab/ab.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { BlacklistService } from './blacklist/blacklist.service';
import { SignupModule } from './signup/signup.module';
import { SignupController } from './signup/signup.controller';
import { SignupService } from './signup/signup.service';
import { TempSignupDataService } from './signup/temp-signup-data.service';
import { BlogModule } from './blog/blog.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AbModule, AuthModule, UsersModule, DatabaseModule, SignupModule, BlogModule, PostModule],
  controllers: [AppController, SignupController],
  providers: [AppService, BlacklistService, SignupService, TempSignupDataService],
})
export class AppModule {}
