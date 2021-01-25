import { Either, Result } from '../../../../shared/core/Result';
import { User } from '../../domain/User';
import { UserWithEmailDoesNotExistError } from './GetUserByEmailErrors';

export type GetUserByEmailResponse = Either<
    UserWithEmailDoesNotExistError | Result<any>,
    Result<User>
>;
