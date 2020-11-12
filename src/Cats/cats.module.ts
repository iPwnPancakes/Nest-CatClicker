import { Module } from '@nestjs/common';
import { CatController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';

@Module({
  controllers: [CatController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
