import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AbModule } from './ab/ab.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { BlacklistService } from './blacklist/blacklist.service';

@Module({
  imports: [AbModule, AuthModule, UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, BlacklistService],
})
export class AppModule {}
