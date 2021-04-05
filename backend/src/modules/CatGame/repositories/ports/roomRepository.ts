import { Room } from '../../domain/Room';
import { RoomId } from '../../domain/RoomId';

export const IRoomRepository = Symbol('IRoomRepository');

export interface IRoomRepository {
    exists(roomId: string): Promise<boolean>;
    getRoomByRoomId(roomId: string): Promise<Room>;
    getRoomByCatId(catId: string): Promise<Room>;
    save(room: Room): Promise<void>;
    delete(room: RoomId): Promise<void>;
}
