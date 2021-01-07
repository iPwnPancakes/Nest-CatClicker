import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class InventoryId extends Entity<any> {
    private constructor(id: UniqueEntityId) {
        super(null, id);
    }

    public static create(id?: UniqueEntityId): Result<InventoryId> {
        return Result.ok<InventoryId>(new InventoryId(id));
    }

    get id(): UniqueEntityId {
        return this._id;
    }
}
