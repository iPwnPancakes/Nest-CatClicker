import { Injectable } from '@nestjs/common';
import { UnexpectedError } from '../../../../shared/core/AppError';
import { left, Result } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { Cat } from '../../domain/Cat';
import { Owner } from '../../domain/Owner';
import { ICatRepository } from '../../repositories/ports/catRepository';
import { IOwnerRepository } from '../../repositories/ports/ownerRepository';
import { CreateCatDTO } from './CreateCatDTO';
import { OwnerDoesNotExistError } from './CreateCatErrors';
import { CreateCatResponse } from './CreateCatResponse';

@Injectable()
export class CreateCat
    implements UseCase<CreateCatDTO, Promise<CreateCatResponse>> {
    constructor(
        private catRepo: ICatRepository,
        private ownerRepo: IOwnerRepository,
    ) {}

    async execute(request?: CreateCatDTO): Promise<CreateCatResponse> {
        try {
            let owner: Owner;

            try {
                owner = await this.ownerRepo.getOwnerByOwnerId(
                    request.owner_id,
                );
            } catch (err) {
                return left(new OwnerDoesNotExistError(request.owner_id));
            }

            const catOrError = Cat.create({
                owner_id: owner.ownerId,
                clickRate: request.clickRate,
                name: request.name,
            });

            if (catOrError.isFailure) {
                return left(Result.fail(catOrError.error.toString()));
            }

            this.catRepo.save(catOrError.getValue());
        } catch (err) {
            return left(UnexpectedError.create(err));
        }
    }
}
