import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { BushosController } from './bushos/bushos.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, BushosController],
  providers: [AppService],
})
export class AppModule {}
