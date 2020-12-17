import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { DecorationEffectId } from './DecorationEffectId';

export enum DecorationEffectEnum {
    INCREASE_PRODUCTIVITY_X1_5,
    INCREASE_PRODUCTIVITY_X2,
}

interface DecorationEffectProps {
    effect: DecorationEffectEnum;
}

export class DecorationEffect extends Entity<DecorationEffectProps> {
    private constructor(props: DecorationEffectProps, id: UniqueEntityId) {
        super(props, id);
    }

    public static create(
        props: DecorationEffectProps,
        id?: UniqueEntityId,
    ): Result<DecorationEffect> {
        return Result.ok<DecorationEffect>(new DecorationEffect(props, id));
    }

    get decorationEffectId(): DecorationEffectId {
        return DecorationEffectId.create(this._id).getValue();
    }
}
