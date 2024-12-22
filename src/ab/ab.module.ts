//ab/ab.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbController } from './ab.controller';
import { AbService } from './ab.service';
import { Companies } from './ab.entity';
import { PitchDeck, Investment } from './ab.entity';
import { Investor } from './investor.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Companies, PitchDeck, Investment, Investor]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0507',
      database: 'optra',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }), AuthModule,
  ],
  controllers: [AbController],
  providers: [AbService],
})
export class AbModule {}
