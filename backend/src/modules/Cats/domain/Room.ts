import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { RoomId } from './RoomId';
import { RoomLevelId } from './RoomLevelId';

interface RoomProps {
    current_room_level_id: RoomLevelId;
}

export class Room extends Entity<RoomProps> {
    get roomId(): RoomId {
        return RoomId.create(this._id).getValue();
    }

    private constructor(props: RoomProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(props: RoomProps, id?: UniqueEntityId): Result<Room> {
        return Result.ok<Room>(new Room(props, id));
    }
}
