import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityId } from "../../../shared/domain/UniqueEntityId";

export class InventoryOwnerId extends Entity<any> {
    private constructor(id: UniqueEntityId) {
        super(null, id);
    }

    public static create(id?: UniqueEntityId): Result<InventoryOwnerId> {
        return Result.ok<InventoryOwnerId>(new InventoryOwnerId(id));
    }

    get id(): UniqueEntityId {
        return this._id;
    }
}