import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodesRepository } from 'src/domain/repository/episodes.repository';
import { WarloadsRepository } from 'src/domain/repository/warloads.repository';
import { WarloadsService } from 'src/service/warloads.service';
import { FileUploders } from 'src/usecase/fileUploaders/fileUploders.controller';
import { WarloadsController } from 'src/usecase/warloads/Warloads.controller';

@Module({
  // imports: [
  //   TypeOrmModule.forFeature(
  //     [WarloadsRepository,EpisodesRepository],
  //     ),
  // ],
  controllers: [FileUploders],
  // providers: [WarloadsService],
})
export class FileUploadersModule {}