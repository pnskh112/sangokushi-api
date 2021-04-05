import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodesRepository } from 'src/domain/repository/episodes.repository';
import { ErasRepository } from 'src/domain/repository/eras.repository';
import { ErasService } from 'src/service/eras.service';
import { ErasController } from 'src/usecase/eras/eras.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ErasRepository,EpisodesRepository],
      ),
  ],
  controllers: [ErasController],
  providers: [ErasService],
})
export class ErasModule {}