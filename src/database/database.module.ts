// database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies, PitchDeck, Investment } from './database.entity';
import { Investor } from './investor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0507',
      database: 'optra',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Automatically load entities
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Companies, PitchDeck, Investment, Investor]), // Register entities
  ],
  exports: [TypeOrmModule], 
})
export class DatabaseModule {}
