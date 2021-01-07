import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class RoomLevelId extends Entity<any> {
    private constructor(id?: UniqueEntityId) {
        super(null, id);
    }

    public static create(id?: UniqueEntityId) {
        return Result.ok<RoomLevelId>(new RoomLevelId(id));
    }

    get id(): UniqueEntityId {
        return this._id;
    }
}
