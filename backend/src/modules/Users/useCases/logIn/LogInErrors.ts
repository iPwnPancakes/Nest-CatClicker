import { Result } from '../../../../shared/core/Result';
import { UseCaseError } from '../../../../shared/core/UseCaseError';

export class IncorrectPasswordError extends Result<UseCaseError> {
    constructor() {
        super(false, { message: 'Password was incorrect' } as UseCaseError);
    }
}

export class UserDoesNotExistError extends Result<UseCaseError> {
    constructor() {
        super(false, { message: `User does not exist` } as UseCaseError);
    }
}

export class MalformedEmailError extends Result<UseCaseError> {
    constructor() {
        super(false, { message: 'Malformed email error' } as UseCaseError);
    }
}
