import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './module/cats.module';
import { typeOrmConfig } from './config/typeorm.config';
import { KingdomsModule } from './module/kingdoms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CatsModule,
    KingdomsModule
  ],
})
export class AppModule {}