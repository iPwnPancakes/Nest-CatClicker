import { Either, Result } from '../../../../shared/core/Result';
import { User } from '../../domain/User';

export type GetUserFromSessionIDResponse = Either<Result<any>, Result<User>>;
