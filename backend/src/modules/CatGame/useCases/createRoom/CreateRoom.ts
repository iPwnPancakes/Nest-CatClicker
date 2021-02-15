import { left, Result, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { Cats } from '../../domain/Cats';
import { Decorations } from '../../domain/Decorations';
import { Room } from '../../domain/Room';
import { NestOwnerRepository } from '../../repositories/adapters/nestOwnerRepository';
import { NestRoomRepository } from '../../repositories/adapters/nestRoomRepository';
import { IOwnerRepository } from '../../repositories/ports/ownerRepository';
import { IRoomRepository } from '../../repositories/ports/roomRepository';
import { CreateRoomDTO } from './CreateRoomDTO';
import { OwnerDoesNotExistError } from './CreateRoomErrors';
import { CreateRoomResponse } from './CreateRoomResponse';

export class CreateRoom
    implements UseCase<CreateRoomDTO, Promise<CreateRoomResponse>> {
    private roomRepo: IRoomRepository;
    private ownerRepo: IOwnerRepository;

    constructor(roomRepo: NestRoomRepository, ownerRepo: NestOwnerRepository) {
        this.roomRepo = roomRepo;
        this.ownerRepo = ownerRepo;
    }

    async execute(request?: CreateRoomDTO): Promise<CreateRoomResponse> {
        const owner = await this.ownerRepo.getOwnerByOwnerId(request.owner_id);

        if (!owner) {
            return left(new OwnerDoesNotExistError(request.owner_id));
        }

        const defaultRoomOrError = Room.create({
            owner_id: owner.ownerId,
            name: request.name,
            maxCatAmount: 5,
            cats: Cats.create([]),
            decorations: Decorations.create(),
        });

        if (defaultRoomOrError.isFailure) {
            return left(Result.fail(defaultRoomOrError.error.toString()));
        }

        const newRoom = defaultRoomOrError.getValue();

        await this.roomRepo.save(newRoom);

        return right(Result.ok(newRoom.roomId));
    }
}
