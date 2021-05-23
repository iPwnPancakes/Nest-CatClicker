import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { User } from '../../Users/domain/User';

interface SessionProps {
    user: User;
    expires_at: Date;
}

export class Session extends AggregateRoot<SessionProps> {
    private constructor(props: SessionProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(
        props: SessionProps,
        id?: UniqueEntityId,
    ): Result<Session> {
        return Result.ok(new Session(props, id));
    }

    public isExpired(): boolean {
        return new Date().toUTCString() >= this.props.expires_at.toUTCString();
    }

    get user(): User {
        return this.props.user;
    }

    get expires_at(): Date {
        return this.props.expires_at;
    }
}
