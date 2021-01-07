import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class DuplicateUserError extends Result<UseCaseError> {
    constructor(reason: string) {
        super(false, reason);
    }
}

