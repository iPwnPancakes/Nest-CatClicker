import { UseCase } from '../../../../shared/core/UseCase';
import { IUserRepository } from '../../../Users/repositories/userRepository';
import { LogInRequestDTO } from './LogInRequestDTO';
import { Either, left, Result, right } from '../../../../shared/core/Result';
import * as LogInErrors from './LogInErrors';
import { User } from '../../../Users/domain/User';
import { LogInResponseDTO } from './LogInResponseDTO';
import { UserEmail } from '../../../Users/domain/UserEmail';
import * as AppError from '../../../../shared/core/AppError';

type Response = Either<
    | LogInErrors.UnsuccessfulLogInError
    | LogInErrors.MalformedEmailError
    | Result<any>,
    Result<LogInResponseDTO>
>;

export class LogIn implements UseCase<LogInRequestDTO, Promise<Response>> {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async execute(request?: LogInRequestDTO): Promise<Response> {
        let user: User;
        let email: UserEmail;

        try {
            const emailOrError = UserEmail.create(request.email);

            if (emailOrError.isFailure) {
                return left(Result.fail<any>(emailOrError.error.toString()));
            }

            email = emailOrError.getValue();

            try {
                user = await this.userRepository.getUserByEmail(email);
            } catch (error) {
                return left(new LogInErrors.UserDoesNotExistError());
            }

            // Check password



            return right(
                Result.ok<LogInResponseDTO>({
                    userId: user.userId.id.toString(),
                }),
            );
        } catch (err) {
            return left(new AppError.UnexpectedError(err.toString()));
        }
    }
}
