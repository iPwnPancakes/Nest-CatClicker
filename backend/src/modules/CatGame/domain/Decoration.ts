import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { DecorationEffects } from './DecorationEffects';
import { DecorationId } from './DecorationId';

interface DecorationProps {
    effects: DecorationEffects;
}

export class Decoration extends AggregateRoot<DecorationProps> {
    private constructor(props: DecorationProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(
        props: DecorationProps,
        id?: UniqueEntityId,
    ): Result<Decoration> {
        return Result.ok<Decoration>(new Decoration(props, id));
    }

    get decorationId(): DecorationId {
        return DecorationId.create(this._id).getValue();
    }

    get effects(): DecorationEffects {
        return this.props.effects;
    }
}
