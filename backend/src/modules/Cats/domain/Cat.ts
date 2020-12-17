import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { CatId } from './CatId';
import { CatLevel } from './CatLevel';
import { Owner } from './Owner';

interface CatProps {
    name: string;
    currentCatLevel: CatLevel;
    currentOwner: Owner;
}

export class Cat extends AggregateRoot<CatProps> {
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

    get catId(): CatId {
        return CatId.create(this._id).getValue();
    }

    get name() {
        return this.props.name;
    }

    get catLevelId() {
        return this.props.currentCatLevel;
    }

    public updateOwner(newOwner: Owner): void {
        this.props.currentOwner = newOwner;
    }

    public updateCatLevel(newLevel: CatLevel): Result<void> {
        if (newLevel.clickRate <= this.props.currentCatLevel.clickRate) {
            return Result.fail<void>('Cannot downgrade cats');
        }

        this.props.currentCatLevel = newLevel;

        return Result.ok<void>();
    }
}
