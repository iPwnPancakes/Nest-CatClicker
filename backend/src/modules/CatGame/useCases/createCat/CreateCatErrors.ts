import { Result } from '../../../../shared/core/Result';
import { UseCaseError } from '../../../../shared/core/UseCaseError';

export class OwnerDoesNotExistError extends Result<UseCaseError> {
    constructor(ownerIdString: string) {
        super(false, {
            message: `Owner with id ${ownerIdString} does not exist or was deleted`,
        } as UseCaseError);
    }
}
