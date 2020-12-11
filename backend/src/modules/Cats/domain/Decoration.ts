import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { DecorationId } from './DecorationId';

export enum DecorationEffectEnum {
    INCREASE_PRODUCTIVITY_X1_5,
    INCREASE_PRODUCTIVITY_X2,
}

interface DecorationProps {
    effects: DecorationEffectEnum[];
}

export class Decoration extends Entity<DecorationProps> {
    get decorationId(): DecorationId {
        return DecorationId.create(this._id).getValue();
    }

    get effects(): DecorationEffectEnum[] {
        return this.props.effects;
    }

    public static create(
        props: DecorationProps,
        id?: UniqueEntityId,
    ): Result<Decoration> {
        return Result.ok<Decoration>(new Decoration(props, id));
    }
}
