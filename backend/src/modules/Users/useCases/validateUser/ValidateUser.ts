import { Injectable } from '@nestjs/common';
import { UnexpectedError } from '../../../../shared/core/AppError';
import { Either, Result, left, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';
import { NestUserRepository } from '../../repositories/adapters/nestUserRepository';
import { IUserRepository } from '../../repositories/ports/userRepository';
import {
    UserDoesNotExistError,
    IncorrectPasswordError,
    MalformedEmailError,
} from './ValidateUserErrors';
import { ValidateUserRequestDTO } from './ValidateUserRequestDTO';
import { ValidateUserResponseDTO } from './ValidateUserResponseDTO';

type Response = Either<
    | UserDoesNotExistError
    | IncorrectPasswordError
    | MalformedEmailError
    | UnexpectedError
    | Result<any>,
    Result<ValidateUserResponseDTO>
>;

@Injectable()
export class ValidateUser
    implements UseCase<ValidateUserRequestDTO, Promise<Response>> {
    private userRepository: IUserRepository;

    constructor(userRepository: NestUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(request: ValidateUserRequestDTO): Promise<Response> {
        let user: User;
        let email: UserEmail;
        let password: UserPassword;

        try {
            const emailOrError = UserEmail.create(request.email);
            const passwordOrError = UserPassword.create({
                value: request.password,
            });

            if (emailOrError.isFailure) {
                return left(Result.fail<any>(emailOrError.error.toString()));
            }

            if (passwordOrError.isFailure) {
                return left(Result.fail<any>(passwordOrError.error.toString()));
            }

            email = emailOrError.getValue();
            password = passwordOrError.getValue();

            try {
                user = await this.userRepository.getUserByEmail(email);
            } catch (error) {
                return left(
                    Result.fail<any>(
                        new UserDoesNotExistError().errorValue().message,
                    ),
                );
            }

            if (!user.password.equals(password)) {
                return left(
                    Result.fail<any>(
                        new IncorrectPasswordError().errorValue().message,
                    ),
                );
            }

            return right(
                Result.ok<ValidateUserResponseDTO>({
                    id: user.userId.id.toString(),
                    username: user.username.value,
                    email: user.email.value,
                }),
            );
        } catch (err) {
            return left(new UnexpectedError(err.toString()));
        }
    }
}
