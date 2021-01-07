import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Cats } from './Cats';
import { Decorations } from './Decorations';
import { RoomId } from './RoomId';
import { RoomLevelId } from './RoomLevelId';

interface RoomProps {
    name: string;
    current_room_level_id: RoomLevelId;
    cats: Cats;
    decorations: Decorations;
}

export class Room extends AggregateRoot<RoomProps> {
    private constructor(props: RoomProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(props: RoomProps, id?: UniqueEntityId): Result<Room> {
        const guardResult = Guard.againstAtLeast(3, props.name);

        if (!guardResult.succeeded) {
            return Result.fail<Room>(guardResult.message);
        }

        return Result.ok<Room>(new Room(props, id));
    }

    get roomId(): RoomId {
        return RoomId.create(this._id).getValue();
    }
}
