import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedError } from '../../../../shared/core/AppError';
import { left, Result, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { Cat } from '../../domain/Cat';
import { Room } from '../../domain/Room';
import { IRoomRepository } from '../../repositories/ports/roomRepository';
import { CreateCatDTO } from './CreateCatDTO';
import { OwnerDoesNotExistError } from './CreateCatErrors';
import { CreateCatResponse } from './CreateCatResponse';

@Injectable()
export class CreateCat
    implements UseCase<CreateCatDTO, Promise<CreateCatResponse>> {
    constructor(@Inject(IRoomRepository) private roomRepo: IRoomRepository) {}

    async execute(request?: CreateCatDTO): Promise<CreateCatResponse> {
        try {
            const exists = await this.roomRepo.exists(request.room_id);

            if (!exists) {
                return left(new OwnerDoesNotExistError(request.room_id));
            }

            const room: Room = await this.roomRepo.getRoomByRoomId(
                request.room_id,
            );

            const catOrError = Cat.create({
                clickRate: request.clickRate,
                name: request.name,
            });

            if (catOrError.isFailure) {
                return left(Result.fail(catOrError.error.toString()));
            }

            const cat = catOrError.getValue();

            room.addCat(cat);

            await this.roomRepo.save(room);

            return right(Result.ok());
        } catch (err) {
            return left(UnexpectedError.create(err));
        }
    }
}
