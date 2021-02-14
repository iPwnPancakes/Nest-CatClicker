import { Result } from '../../../../shared/core/Result';
import { UseCaseError } from '../../../../shared/core/UseCaseError';

export class UserDoesNotExistError extends Result<UseCaseError> {
    constructor(userIdString: string) {
        super(false, {
            message: `User with id ${userIdString} does not exist or was deleted`,
        } as UseCaseError);
    }
}
