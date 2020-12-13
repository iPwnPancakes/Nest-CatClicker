import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserUsername } from './UserUsername';

interface UserProps {
    username: UserUsername;
    email: UserEmail;
    kibble: number;
    user_inventory_id: UserId;
}

export class User extends AggregateRoot<UserProps> {
    get userId() {
        return UserId.create(this._id);
    }

    private constructor(props: UserProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(props: UserProps): Result<User> {
        const guardResult = Guard.greaterThan(0, props.kibble);

        if (!guardResult.succeeded) {
            return Result.fail<User>(guardResult.message);
        }

        return Result.ok<User>(new User(props));
    }
}
