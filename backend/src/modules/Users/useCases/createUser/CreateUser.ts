import { left, Result, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserUsername } from '../../domain/UserUsername';
import { IUserRepository } from '../../repositories/ports/userRepository';
import { CreateUserRequestDTO } from './CreateUserRequestDTO';
import { CreateUserResponse } from './CreateUserResponse';
import { UnexpectedError } from '../../../../shared/core/AppError';
import { DuplicateUserError } from './CreateUserErrors';
import { Injectable } from '@nestjs/common';
import { NestUserRepository } from '../../repositories/adapters/nestUserRepository';
import { UserPassword } from '../../domain/UserPassword';

@Injectable()
export class CreateUser
    implements UseCase<CreateUserRequestDTO, Promise<CreateUserResponse>> {
    private userRepo: IUserRepository;

    constructor(userRepo: NestUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(request?: CreateUserRequestDTO): Promise<CreateUserResponse> {
        const emailOrError = UserEmail.create(request.email);
        const usernameOrError = UserUsername.create({
            value: request.username,
        });
        const passwordOrError = UserPassword.create({ value: request.password });

        const validationResult = Result.combine([
            emailOrError,
            usernameOrError,
            passwordOrError
        ]);

        if (validationResult.isFailure) {
            return left(Result.fail<void>(validationResult.error));
        }

        const email: UserEmail = emailOrError.getValue();
        const username: UserUsername = usernameOrError.getValue();
        const password: UserPassword = passwordOrError.getValue();

        try {
            const emailAlreadyExists = await this.userRepo.emailExists(email);
            const usernameAlreadyExists = await this.userRepo.usernameExists(
                username,
            );

            if (emailAlreadyExists) {
                return left(
                    new DuplicateUserError('User with email already exists'),
                );
            } else if (usernameAlreadyExists) {
                return left(
                    new DuplicateUserError('User with username already exists'),
                );
            }

            const userOrError: Result<User> = User.create({
                email,
                username,
                password
            });

            if (userOrError.isFailure) {
                return left(Result.fail<User>(userOrError.error.toString()));
            }

            const user: User = userOrError.getValue();

            await this.userRepo.save(user);

            return right(Result.ok<void>());
        } catch (err) {
            return left(new UnexpectedError(err));
        }
    }
}
