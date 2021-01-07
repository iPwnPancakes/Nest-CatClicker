import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class DecorationId extends Entity<any> {
    private constructor(id?: UniqueEntityId) {
        super(null, id);
    }

    public static create(id?: UniqueEntityId): Result<DecorationId> {
        return Result.ok<DecorationId>(new DecorationId(id));
    }

    get id(): UniqueEntityId {
        return this._id;
    }
}
