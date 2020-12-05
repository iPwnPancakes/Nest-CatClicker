import { Test } from '@nestjs/testing';
import { WsResponse } from '@nestjs/websockets';
import { IncrementCatWsDto } from '../../dto/increment-cat.ws.dto';
import { CatRepository } from '../../repositories/cats.repository';
import { CatsService } from '../../services/cats.service';
import { CatWsGateway } from './cats.ws.gateway';

describe('CatWsGateway', () => {
    let cat_websocket_gateway: CatWsGateway;
    let cat_service: CatsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [CatWsGateway, CatsService],
        }).compile();

        cat_service = moduleRef.get<CatsService>(CatsService);
        cat_websocket_gateway = moduleRef.get<CatWsGateway>(CatWsGateway);

        cat_service.cats = new CatRepository([
            { id: '1', name: 'Pepperoni', clicks: 0, parents: [] },
            { id: '2', name: 'Rigatoni', clicks: 0, parents: [] },
        ]);
    });

    describe('getAllCats event', () => {
        it('returns CatService cats', () => {
            const response: WsResponse = cat_websocket_gateway.handleGetAllCatsEvent();

            expect(response.event).toBe('getAllCats');
            expect(response.data).toStrictEqual([
                { id: '1', name: 'Pepperoni', clicks: 0, parents: [] },
                { id: '2', name: 'Rigatoni', clicks: 0, parents: [] },
            ]);
        });
    });

    describe('incrementCat event', () => {
        it('correctly increments cats', () => {
            const test_dto: IncrementCatWsDto = { id: '1' };
            const response: WsResponse = cat_websocket_gateway.handleIncrementEvent(test_dto);

            expect(response.event).toBe('incrementCat');
            expect(response.data).toStrictEqual({ id: '1', name: 'Pepperoni', clicks: 1, parents: [] },)
        });
    });
});
