import { Inject, Injectable } from '@nestjs/common';
import { left, Result } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { User } from '../../../Users/domain/User';
import { IUserRepository } from '../../../Users/repositories/ports/userRepository';
import { Owner } from '../../domain/Owner';
import { IOwnerRepository } from '../../repositories/ports/ownerRepository';
import { CreateOwnerDTO } from './CreateOwnerDTO';
import { UserDoesNotExistError } from './CreateOwnerErrors';
import { CreateOwnerResponse } from './CreateOwnerResponse';

@Injectable()
export class CreateOwner
    implements UseCase<CreateOwnerDTO, Promise<CreateOwnerResponse>> {
    constructor(
        @Inject(IOwnerRepository) private ownerRepo: IOwnerRepository,
        @Inject(IUserRepository) private userRepo: IUserRepository,
    ) {}

    async execute(request?: CreateOwnerDTO): Promise<CreateOwnerResponse> {
        let user: User;

        try {
            user = await this.userRepo.getUserByUserId(request.user_id);
        } catch (err) {
            return left(new UserDoesNotExistError(request.user_id));
        }

        const ownerOrError = Owner.create({
            user_id: user.userId,
        });

        if (ownerOrError.isFailure) {
            return left(Result.fail(ownerOrError.error.toString()));
        }

        const owner = ownerOrError.getValue();

        this.ownerRepo.save(owner);
    }
}
