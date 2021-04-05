import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { CatId } from './CatId';

interface CatProps {
    name: string;
    clickRate: number;
}

export class Cat extends Entity<CatProps> {
    private constructor(props: CatProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(props: CatProps, id?: UniqueEntityId): Result<Cat> {
        const guardResult = Guard.againstAtLeast(1, props.name);

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

    get clickRate() {
        return this.props.clickRate;
    }

    public increaseClickRate(newClickRate: number): Result<void> {
        if (newClickRate <= this.props.clickRate) {
            Result.fail('Cannot decrease click rate');
        }

        this.props.clickRate = newClickRate;

        return Result.ok();
    }
}
