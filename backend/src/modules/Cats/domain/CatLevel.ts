import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { CatLevelId } from './CatLevelId';

interface CatLevelProps {
    click_rate: number;
}

export class CatLevel extends Entity<CatLevelProps> {
    private constructor(props: CatLevelProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(
        props: CatLevelProps,
        id?: UniqueEntityId,
    ): Result<CatLevel> {
        const guardResult = Guard.greaterThan(0, props.click_rate);

        if (!guardResult.succeeded) {
            return Result.fail<CatLevel>(guardResult.message);
        }

        return Result.ok<CatLevel>(new CatLevel(props, id));
    }
    
    get catLevelId(): CatLevelId {
        return CatLevelId.create(this._id).getValue();
    }

    get clickRate(): number {
        return this.props.click_rate;
    }
}
