import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

interface UserUsernameProps {
    value: string;
}

export class UserUsername extends ValueObject<UserUsernameProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: UserUsernameProps) {
        super(props);
    }

    private static isValidUsername(username: string): boolean {
        if (username.length < 6) {
            return false;
        }

        if (username.length >= 20) {
            return false;
        }

        const alphanumeric_regex = /^\w+$/;
        return alphanumeric_regex.test(username);
    }

    public static create(props: UserUsernameProps): Result<UserUsername> {
        if (!this.isValidUsername(props.value)) {
            return Result.fail<UserUsername>('Username was not valid');
        }

        return Result.ok<UserUsername>(new UserUsername(props));
    }
}
