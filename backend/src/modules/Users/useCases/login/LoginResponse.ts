import { Either, Result } from '../../../../shared/core/Result';

export type LoginResponse = Either<Result<any>, Result<void>>;
