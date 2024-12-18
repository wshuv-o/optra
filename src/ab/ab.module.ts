import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbController } from './ab.controller';
import { AbService } from './ab.service';
import { Companies } from './ab.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Companies]),
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
    })
  ],
  controllers: [AbController],
  providers: [AbService],
})
export class AbModule {}
