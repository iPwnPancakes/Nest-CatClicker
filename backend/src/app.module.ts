import { Module } from '@nestjs/common';
import { CatsModule } from './Cats/cats.module';

@Module({
  imports: [CatsModule]
})
export class AppModule {}
