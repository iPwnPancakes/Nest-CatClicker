import { CatsService } from '../../services/cats.service';
import { ICat } from '../../interfaces/cat.interface';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WsResponse,
} from '@nestjs/websockets';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { IncrementCatWsDto } from '../../../Cats/dto/increment-cat.ws.dto';

@WebSocketGateway(3026)
export class CatWsGateway {
    constructor(private readonly catService: CatsService) {}

    @SubscribeMessage('getAllCats')
    handleGetAllCatsEvent(): WsResponse<ICat[]> {
        return {
            event: 'getAllCats',
            data: this.catService.getAll(),
        };
    }

    @UsePipes(new ValidationPipe())
    @SubscribeMessage('incrementCat')
    handleIncrementEvent(@MessageBody() dto: IncrementCatWsDto): WsResponse<ICat> {
        return {
            event: 'incrementCat',
            data: this.catService.incrementCat(dto.id),
        };
    }
}
