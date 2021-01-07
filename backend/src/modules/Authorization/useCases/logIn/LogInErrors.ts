import { Result } from '../../../../shared/core/Result';
import { UseCaseError } from '../../../../shared/core/UseCaseError';

export class UnsuccessfulLogInError extends Result<UseCaseError> {
    constructor() {
        super(false, { message: 'Username or password was incorrect' });
    }
}

export class UserDoesNotExistError extends Result<UseCaseError> {
    constructor() {
        super(false, { message: `User does not exist` });
    }
}

export class MalformedEmailError extends Result<UseCaseError> {
    constructor() {
        super(false, { message: 'Malformed email error' });
    }
}
