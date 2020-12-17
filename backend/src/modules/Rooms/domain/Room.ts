import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Cats } from '../../Cats/domain/Cats';
import { Decorations } from '../../Decorations/domain/Decorations';
import { RoomId } from './RoomId';
import { RoomLevelId } from './RoomLevelId';

interface RoomProps {
    current_room_level_id: RoomLevelId;
    cats: Cats;
    decorations: Decorations;
}

export class Room extends AggregateRoot<RoomProps> {
    private constructor(props: RoomProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(props: RoomProps, id?: UniqueEntityId): Result<Room> {
        return Result.ok<Room>(new Room(props, id));
    }

    get roomId(): RoomId {
        return RoomId.create(this._id).getValue();
    }
}
