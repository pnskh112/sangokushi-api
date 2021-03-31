import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodesRepository } from 'src/domain/repository/episodes.repository';
import { WarloadsRepository } from 'src/domain/repository/warloads.repository';
import { WarloadsService } from 'src/service/warloads.service';
import { WarloadsController } from 'src/usecase/warloads/Warloads.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [WarloadsRepository,EpisodesRepository],
      ),
  ],
  controllers: [WarloadsController],
  providers: [WarloadsService],
})
export class WarloadsModule {}