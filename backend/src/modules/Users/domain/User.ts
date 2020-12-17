import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserUsername } from './UserUsername';

interface UserProps {
    username: UserUsername;
    email: UserEmail;
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
        return Result.ok<User>(new User(props));
    }
}
