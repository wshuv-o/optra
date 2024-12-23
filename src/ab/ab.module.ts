//ab/ab.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbController } from './ab.controller';
import { AbService } from './ab.service';
import { PitchDeck, Companies, Investment } from '../database/database.entity';
import { Investor } from '../database/investor.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Companies, PitchDeck, Investment, Investor]),  AuthModule,
  ],
  controllers: [AbController],
  providers: [AbService],
  exports: [AbService]
})
export class AbModule {}
