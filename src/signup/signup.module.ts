import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { TempSignupDataService } from './temp-signup-data.service';
import { Companies } from 'src/database/database.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Companies])],
  controllers: [SignupController],
  providers: [SignupService, TempSignupDataService],
})
export class SignupModule {}
