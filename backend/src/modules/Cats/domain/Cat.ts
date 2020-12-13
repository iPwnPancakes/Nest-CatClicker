import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { CatId } from './CatId';
import { CatLevel } from './CatLevel';

interface CatProps {
    name: string;
    currentCatLevel: CatLevel;
}

export class Cat extends Entity<CatProps> {
    get catId(): CatId {
        return CatId.create(this._id).getValue();
    }

    get name() {
        return this.props.name;
    }

    get catLevelId() {
        return this.props.currentCatLevel;
    }

    private constructor(props: CatProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(props: CatProps, id?: UniqueEntityId): Result<Cat> {
        const guardResult = Guard.againstAtLeast(0, props.name);

        if (!guardResult.succeeded) {
            return Result.fail<Cat>(guardResult.message);
        }

        return Result.ok<Cat>(new Cat(props, id));
    }
}
