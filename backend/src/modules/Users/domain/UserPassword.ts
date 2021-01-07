import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

interface UserPasswordProps {
    value: string;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
    private constructor(props: UserPasswordProps) {
        super(props);
    }

    public static create(props: UserPasswordProps) {
        const guardResult = Guard.againstAtLeast(6, props.value);

        if (!guardResult.succeeded) {
            return Result.fail<UserPassword>(guardResult.message);
        }

        return Result.ok<UserPassword>(new UserPassword(props));
    }
}
