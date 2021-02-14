import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Cat } from './Cat';
import { DecorationId } from './DecorationId';
import { OwnerId } from './OwnerId';

export type DecorationCondition = (cat: Cat) => boolean;

interface DecorationProps {
    owner_id: OwnerId;
    name: string;
    cat_click_multiplier: number;
    conditions: DecorationCondition[];
}

export class Decoration extends Entity<DecorationProps> {
    private constructor(props: DecorationProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(
        props: DecorationProps,
        id?: UniqueEntityId,
    ): Result<Decoration> {
        return Result.ok<Decoration>(new Decoration(props, id));
    }

    get name(): string {
        return this.props.name;
    }

    get decorationId(): DecorationId {
        return DecorationId.create(this._id).getValue();
    }

    get ownerId(): OwnerId {
        return this.props.owner_id;
    }

    get catClickMultiplier(): number {
        return this.props.cat_click_multiplier;
    }

    get conditions(): DecorationCondition[] {
        return this.props.conditions;
    }

    public checkIfCatPassesConditions(cat: Cat) {
        return this.props.conditions.every(condition => condition(cat));
    }
}
