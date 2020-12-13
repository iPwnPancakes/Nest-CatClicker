import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class UserInventoryId extends Entity<any> {
    get id(): UniqueEntityId {
        return this._id;
    }

    private constructor(id?: UniqueEntityId) {
        super(null, id);
    }

    public static create(id?: UniqueEntityId): Result<UserInventoryId> {
        return Result.ok<UserInventoryId>(new UserInventoryId(id));
    }
}
