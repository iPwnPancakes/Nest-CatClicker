import { UseCase } from '../../../../shared/core/UseCase';
import { IUserRepository } from '../../../Users/repositories/ports/userRepository';
import { LogInRequestDTO } from './LogInRequestDTO';
import { Either, left, Result, right } from '../../../../shared/core/Result';
import {
    UserDoesNotExistError,
    IncorrectPasswordError,
    MalformedEmailError,
} from './LogInErrors';
import { User } from '../../../Users/domain/User';
import { LogInResponseDTO } from './LogInResponseDTO';
import { UserEmail } from '../../../Users/domain/UserEmail';
import { UnexpectedError } from '../../../../shared/core/AppError';
import { UserPassword } from '../../../Users/domain/UserPassword';
import { Injectable } from '@nestjs/common';

type Response = Either<
    | UserDoesNotExistError
    | IncorrectPasswordError
    | MalformedEmailError
    | UnexpectedError
    | Result<any>,
    Result<LogInResponseDTO>
>;

@Injectable()
export class LogIn implements UseCase<LogInRequestDTO, Promise<Response>> {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async execute(request?: LogInRequestDTO): Promise<Response> {
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
                Result.ok<LogInResponseDTO>({
                    userId: user.userId.id.toString(),
                }),
            );
        } catch (err) {
            return left(new UnexpectedError(err.toString()));
        }
    }
}
