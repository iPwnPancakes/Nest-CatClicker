import { Inject, Injectable } from '@nestjs/common';
import { Either, left, Result, right } from '../../../../shared/core/Result';
import { UserPassword } from '../../domain/UserPassword';
import { UserUsername } from '../../domain/UserUsername';
import { IUserRepository } from '../../repositories/ports/userRepository';

export type AuthServiceResponse = Either<Result<any>, Result<void>>;

export const IAuthService = Symbol('IAuthService');

export interface IAuthService {
    validateUserCredentials(
        username: UserUsername,
        password: UserPassword,
    ): Promise<AuthServiceResponse>;
}

@Injectable()
export class AuthService implements IAuthService {
    constructor(@Inject(IUserRepository) private userRepo: IUserRepository) {}

    async validateUserCredentials(
        username: UserUsername,
        password: UserPassword,
    ): Promise<AuthServiceResponse> {
        const exists = await this.userRepo.usernameExists(username);

        if (!exists) {
            return left(Result.fail('User does not exist'));
        }

        const user = await this.userRepo.getUserByUsername(username);

        const passwordsMatch = user.password.equals(password);

        if (!passwordsMatch) {
            return left(Result.fail('Passwords do not match'));
        }

        return right(Result.ok());
    }
}
