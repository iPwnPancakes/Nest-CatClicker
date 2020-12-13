import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UserId } from '../../Users/domain/UserId';
import { Cats } from './Cats';
import { Decorations } from './Decorations';
import { OwnerId } from './OwnerId';
import { Rooms } from './Rooms';

interface OwnerProps {
    userId: UserId;
    cats: Cats;
    decorations: Decorations;
    rooms: Rooms;
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
        return this.props.userId;
    }

    get cats(): Cats {
        return this.props.cats;
    }

    get decorations(): Decorations {
        return this.props.decorations;
    }

    get rooms(): Rooms {
        return this.props.rooms;
    }
}
