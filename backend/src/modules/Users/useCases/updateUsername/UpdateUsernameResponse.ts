import { Either, Result } from '../../../../shared/core/Result';
import { UsernameAlreadyExistsError } from './UpdateUsernameErrors';

export type UpdateUsernameResponse = Either<
    UsernameAlreadyExistsError | Result<any>,
    Result<void>
>;
