import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsRepository } from 'src/repository/cats.repository';
import { CatsController } from 'src/usecase/cats/cats.controller';
import { CatsService } from '../cats/cats.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatsRepository]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}