import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KingdomsRepository } from 'src/domain/repository/kingdoms.repository';
import { KingdomsService } from 'src/service/kingdoms.service';
import { KingdomsController } from 'src/usecase/Kingdoms/kingdoms.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([KingdomsRepository]),
  ],
  controllers: [KingdomsController],
  providers: [KingdomsService],
})
export class KingdomsModule {}