import { Result } from '../../../../shared/core/Result';
import { UseCaseError } from '../../../../shared/core/UseCaseError';

export class UsernameAlreadyExistsError extends Result<UseCaseError> {
    constructor(reason: string) {
        super(false, { message: reason } as UseCaseError);
    }
}

export class UserNotFoundError extends Result<UseCaseError> {
    constructor(reason: string) {
        super(false, { message: reason } as UseCaseError);
    }
}
