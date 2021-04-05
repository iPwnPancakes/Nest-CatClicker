import { Provider } from '@nestjs/common';
import { NestRoomRepository } from '../../repositories/adapters/nestRoomRepository';
import { IRoomRepository } from '../../repositories/ports/roomRepository';

export const RoomRepositoryProvider: Provider = {
    provide: IRoomRepository,
    useClass: NestRoomRepository,
};
