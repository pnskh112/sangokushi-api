import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './usecase/cats/cats.controller';
import { typeOrmConfig } from './config/typeorm.config';
import { BushosController } from './bushos/bushos.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig )
  ],
  controllers: [AppController, CatsController, BushosController],
  providers: [AppService],
})
export class AppModule {}
