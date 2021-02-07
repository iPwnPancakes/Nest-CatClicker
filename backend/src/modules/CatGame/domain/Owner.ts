import { Result } from '../../../shared/core/Result';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UserId } from '../../Users/domain/UserId';
import { OwnerId } from './OwnerId';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';

interface OwnerProps {
    user_id: UserId;
}

export class Owner extends AggregateRoot<OwnerProps> {
    private constructor(props: OwnerProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(
        props: OwnerProps,
        id?: UniqueEntityId,
    ): Result<Owner> {
        return Result.ok<Owner>(new Owner(props, id));
    }

    get ownerId(): OwnerId {
        return OwnerId.create(this._id).getValue();
    }

    get userId(): UserId {
        return this.props.user_id;
    }
}
