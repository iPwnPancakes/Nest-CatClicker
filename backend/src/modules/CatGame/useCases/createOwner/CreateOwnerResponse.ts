import { Either, Result } from "../../../../shared/core/Result";

export type CreateOwnerResponse = Either<
    Result<any>,
    Result<void>
>