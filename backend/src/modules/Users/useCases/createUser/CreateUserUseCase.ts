import { Result } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserUsername } from '../../domain/UserUsername';
import { IUserRepository } from '../../repositories/userRepository';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCase implements UseCase<CreateUserDTO, any> {
    private userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(request?: CreateUserDTO): Promise<Result<any>> {
        const emailOrError = UserEmail.create(request.email);
        const usernameOrError = UserUsername.create({
            value: request.username,
        });

        const validationResult = Result.combine([
            emailOrError,
            usernameOrError,
        ]);

        if (validationResult.isFailure) {
            return Result.fail<void>(validationResult.error);
        }

        const email: UserEmail = emailOrError.getValue();
        const username: UserUsername = usernameOrError.getValue();

        try {
            const emailAlreadyExists = await this.userRepo.emailExists(email);
            const usernameAlreadyExists = await this.userRepo.usernameExists(
                username,
            );

            if (emailAlreadyExists) {
                return Result.fail<void>('Email already exists');
            } else if (usernameAlreadyExists) {
                return Result.fail<void>('Username already exists');
            }

            const userOrError: Result<User> = User.create({
                email,
                username,
            });

            if (userOrError.isFailure) {
                return Result.fail<void>(userOrError.error.toString());
            }

            const user: User = userOrError.getValue();

            await this.userRepo.save(user);

            return Result.ok<void>();
        } catch (err) {
            return Result.fail<void>(err);
        }
    }
}
