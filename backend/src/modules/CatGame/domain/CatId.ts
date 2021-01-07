import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class CatId extends Entity<any> {
    private constructor(id?: UniqueEntityId) {
        super(null, id);
    }

    public static create(id?: UniqueEntityId): Result<CatId> {
        return Result.ok<CatId>(new CatId(id));
    }
    
    get id(): UniqueEntityId {
        return this._id;
    }
}
