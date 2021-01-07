import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class DecorationEffectId extends Entity<any> {
    private constructor(id?: UniqueEntityId) {
        super(null, id);
    }

    public static create(id?: UniqueEntityId): Result<DecorationEffectId> {
        return Result.ok<DecorationEffectId>(new DecorationEffectId(id));
    }

    get id(): UniqueEntityId {
        return this._id;
    }
}
