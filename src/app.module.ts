import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './module/cats.module';
import { typeOrmConfig } from './config/typeorm.config';
import { KingdomsModule } from './module/kingdoms.module';
import { WarloadsModule } from './module/warloads.module';
import { ErasModule } from './module/eras.module';
import { FileUploadersModule } from './module/fileUploders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CatsModule,
    KingdomsModule,
    WarloadsModule,
    ErasModule,
    FileUploadersModule,
  ],
})
export class AppModule {}