import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodesRepository } from 'src/domain/repository/episodes.repository';
import { ErasRepository } from 'src/domain/repository/eras.repository';
import { WarloadsRepository } from 'src/domain/repository/warloads.repository';
import { ErasService } from 'src/service/eras.service';
import { WarloadsService } from 'src/service/warloads.service';
import { ErasController } from 'src/usecase/eras/eras.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ErasRepository,WarloadsRepository,EpisodesRepository],
      ),
  ],
  controllers: [ErasController],
  providers: [ErasService,WarloadsService],
})
export class ErasModule {}