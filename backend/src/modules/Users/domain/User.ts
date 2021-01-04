import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserUsername } from './UserUsername';

interface UserProps {
    username: UserUsername;
    email: UserEmail;
}

export class User extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(props: UserProps): Result<User> {
        return Result.ok<User>(new User(props));
    }

    get userId(): UserId {
        return UserId.create(this._id).getValue();
    }

    get email(): UserEmail {
        return this.props.email;
    }

    get username(): UserUsername {
        return this.props.username;
    }
}
