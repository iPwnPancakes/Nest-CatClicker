import { Injectable } from '@nestjs/common';
import { left, Result } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { User } from '../../../Users/domain/User';
import { NestUserRepository } from '../../../Users/repositories/adapters/nestUserRepository';
import { IUserRepository } from '../../../Users/repositories/ports/userRepository';
import { Owner } from '../../domain/Owner';
import { NestOwnerRepository } from '../../repositories/adapters/nestOwnerRepository';
import { IOwnerRepository } from '../../repositories/ports/ownerRepository';
import { CreateOwnerDTO } from './CreateOwnerDTO';
import { CreateOwnerResponse } from './CreateOwnerResponse';

@Injectable()
export class CreateOwner
    implements UseCase<CreateOwnerDTO, Promise<CreateOwnerResponse>> {
    private ownerRepo: IOwnerRepository;
    private userRepo: IUserRepository;

    constructor(ownerRepo: NestOwnerRepository, userRepo: NestUserRepository) {
        this.ownerRepo = ownerRepo;
        this.userRepo = userRepo;
    }

    async execute(request?: CreateOwnerDTO): Promise<CreateOwnerResponse> {
        const user: User = await this.userRepo.getUserByUserId(request.user_id);

        if (!user) {
            throw new Error('User with that ID does not exist');
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
