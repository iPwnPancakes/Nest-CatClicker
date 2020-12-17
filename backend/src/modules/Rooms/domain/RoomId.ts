import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class RoomId extends Entity<any> {
    private constructor(id?: UniqueEntityId) {
        super(null, id);
    }

    public static create(id?: UniqueEntityId): Result<RoomId> {
        return Result.ok<RoomId>(new RoomId(id));
    }

    get id(): UniqueEntityId {
        return this._id;
    }
}
