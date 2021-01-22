import { Injectable } from '@nestjs/common';
import { UnexpectedError } from '../../../../shared/core/AppError';
import { left, Result, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { User } from '../../domain/User';
import { UserUsername } from '../../domain/UserUsername';
import { NestUserRepository } from '../../repositories/adapters/nestUserRepository';
import { IUserRepository } from '../../repositories/ports/userRepository';
import {
    UsernameAlreadyExistsError,
    UserNotFoundError,
} from './UpdateUsernameErrors';
import { UpdateUsernameRequestDTO } from './UpdateUsernameRequestDTO';
import { UpdateUsernameResponse } from './UpdateUsernameResponse';

@Injectable()
export class UpdateUsername
    implements
        UseCase<UpdateUsernameRequestDTO, Promise<UpdateUsernameResponse>> {
    private userRepo: IUserRepository;

    constructor(userRepo: NestUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(
        request?: UpdateUsernameRequestDTO,
    ): Promise<UpdateUsernameResponse> {
        let user: User;

        const usernameOrError = UserUsername.create({
            value: request.new_username,
        });

        if (usernameOrError.isFailure) {
            return left(Result.fail<void>(usernameOrError.error.toString()));
        }

        try {
            const exists = await this.userRepo.usernameExists(
                usernameOrError.getValue(),
            );

            if (exists) {
                return left(
                    new UsernameAlreadyExistsError(
                        'User with username already exists',
                    ),
                );
            }

            user = await this.userRepo.getUserByUserId(request.user_id);

            if (!user) {
                return left(new UserNotFoundError('User not found'));
            }

            user.updateUsername(usernameOrError.getValue());

            await this.userRepo.save(user);

            return right(Result.ok<void>());
        } catch (err) {
            return left(new UnexpectedError(err));
        }
    }
}
