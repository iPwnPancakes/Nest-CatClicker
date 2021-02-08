import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UserCreated } from './events/userCreated';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserPassword } from './UserPassword';
import { UserUsername } from './UserUsername';

interface UserProps {
    username: UserUsername;
    email: UserEmail;
    password: UserPassword;
}

export class User extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueEntityId): Result<User> {
        const user: User = new User(props, id);

        const idWasProvided = Boolean(id);

        if (!idWasProvided) {
            user.addDomainEvent(new UserCreated(user));
        }

        return Result.ok<User>(user);
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

    get password(): UserPassword {
        return this.props.password;
    }

    public updateUsername(username: UserUsername) {
        this.props.username = username;
    }

    public updatePassword(password: UserPassword): void {
        this.props.password = password;
    }
}
