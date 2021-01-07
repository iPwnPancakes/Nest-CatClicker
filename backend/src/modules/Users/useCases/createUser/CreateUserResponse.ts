import { Either, Result } from '../../../../shared/core/Result';
import { DuplicateUserError } from './CreateUserErrors';
import { UnexpectedError } from '../../../../shared/core/AppError';

export type CreateUserResponse = Either<
    DuplicateUserError | UnexpectedError | Result<any>,
    Result<void>
>;
