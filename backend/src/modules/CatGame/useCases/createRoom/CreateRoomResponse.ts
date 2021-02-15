import { Either, Result } from '../../../../shared/core/Result';
import { RoomId } from '../../domain/RoomId';
import { OwnerDoesNotExistError } from './CreateRoomErrors';

export type CreateRoomResponse = Either<
    OwnerDoesNotExistError | Result<any>,
    Result<RoomId>
>;
