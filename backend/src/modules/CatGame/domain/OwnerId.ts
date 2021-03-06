import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class OwnerId extends Entity<any> {
    private constructor(id?: UniqueEntityId) {
        super(null, id);
    }

    public static create(id?: UniqueEntityId): Result<OwnerId> {
        return Result.ok<OwnerId>(new OwnerId(id));
    }

    get id(): UniqueEntityId {
        return this._id;
    }
}
