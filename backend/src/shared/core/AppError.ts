import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

export class UnexpectedError extends Result<UseCaseError> {
    constructor(err: any) {
        super(false, {
            message: 'An unexpected error occured',
            error: err,
        } as UseCaseError);
    }

    public static create(err: any): UnexpectedError {
        return new UnexpectedError(err);
    }
}
