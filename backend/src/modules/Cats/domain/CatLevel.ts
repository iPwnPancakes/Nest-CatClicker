import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { CatLevelId } from './CatLevelId';
import { ClickRate } from './ClickRate';

interface CatLevelProps {
    click_rate: ClickRate;
}

export class CatLevel extends Entity<CatLevelProps> {
    get catLevelId(): CatLevelId {
        return CatLevelId.create(this._id).getValue();
    }

    get clickRate(): ClickRate {
        return this.props.click_rate;
    }

    public static create(
        props: CatLevelProps,
        id?: UniqueEntityId,
    ): Result<CatLevel> {
        return Result.ok<CatLevel>(new CatLevel(props, id));
    }

    private constructor(props: CatLevelProps, id?: UniqueEntityId) {
        super(props, id);
    }
}
