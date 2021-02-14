import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsRepository } from 'src/repository/cats.repository';
import { CatsService } from 'src/service/cats.service';
import { CatsController } from 'src/usecase/cats/cats.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatsRepository]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}