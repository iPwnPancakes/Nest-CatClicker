import { Module } from '@nestjs/common';
import { CatController } from './Cats.controller';
import { CatsService } from './Cats.service';

@Module({
  controllers: [CatController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
