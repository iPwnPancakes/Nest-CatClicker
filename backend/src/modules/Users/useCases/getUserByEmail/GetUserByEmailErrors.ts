import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class UserWithEmailDoesNotExistError extends Result<UseCaseError> {
    constructor(reason: string) {
        super(false, { message: reason } as UseCaseError);
    }
}
