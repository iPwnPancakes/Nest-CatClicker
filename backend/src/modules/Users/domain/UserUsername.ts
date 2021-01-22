import { Guard } from '../../../shared/core/Guard';
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
        const alphanumeric_regex = /^\w+$/;

        return alphanumeric_regex.test(username);
    }

    public static create(props: UserUsernameProps): Result<UserUsername> {
        const guardResult = Guard.combine([
            Guard.againstAtLeast(6, props.value),
            Guard.againstAtMost(20, props.value)
        ]);

        if(!guardResult.succeeded) {
            return Result.fail<UserUsername>(guardResult.message);
        }

        if (!this.isValidUsername(props.value)) {
            return Result.fail<UserUsername>('Username was not valid');
        }

        return Result.ok<UserUsername>(new UserUsername(props));
    }
}
