import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarloadsRepository } from 'src/domain/repository/warloads.repository';
import { WarloadsService } from 'src/service/warloads.service';
import { WarloadsController } from 'src/usecase/warloads/Warloads.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WarloadsRepository]),
  ],
  controllers: [WarloadsController],
  providers: [WarloadsService],
})
export class WarloadsModule {}