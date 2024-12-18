import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AbModule } from './ab/ab.module';


@Module({
  imports: [AbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
