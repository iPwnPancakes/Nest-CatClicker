import { Module } from '@nestjs/common';
import { CatController } from './controllers/http/cats.http.controller';
import { CatWsGateway } from './controllers/ws/cats.ws.gateway';
import { CatsService } from './services/cats.service';

@Module({
    controllers: [CatController],
    providers: [CatWsGateway, CatsService],
    exports: [CatsService],
})
export class CatsModule {}
