import { Inject, Injectable } from '@nestjs/common';
import { left, Result, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { UserPassword } from '../../domain/UserPassword';
import { UserUsername } from '../../domain/UserUsername';
import { IUserRepository } from '../../repositories/ports/userRepository';
import { IAuthService } from '../../services/AuthService/authService';
import { ISessionService } from '../../services/SessionService/ports/sessionService';
import { LoginDTO } from './LoginDTO';
import { LoginResponse } from './LoginResponse';

@Injectable()
export class Login implements UseCase<LoginDTO, Promise<LoginResponse>> {
    constructor(
        @Inject(IUserRepository) private userRepo: IUserRepository,
        @Inject(IAuthService) private authService: IAuthService,
        @Inject(ISessionService) private sessionService: ISessionService,
    ) {
        this.userRepo = userRepo;
        this.authService = authService;
        this.sessionService = sessionService;
    }

    async execute(request?: LoginDTO): Promise<LoginResponse> {
        const userUsernameOrError = UserUsername.create({
            value: request.username,
        });

        if (userUsernameOrError.isFailure) {
            return left(Result.fail(userUsernameOrError.error.toString()));
        }

        const userPasswordOrError = UserPassword.create({
            value: request.password,
        });

        if (userPasswordOrError.isFailure) {
            return left(Result.fail(userPasswordOrError.error.toString()));
        }

        const userUsername = userUsernameOrError.getValue();
        const userPassword = userPasswordOrError.getValue();

        const isCredentialsValid = await this.authService.validateUserCredentials(
            userUsername,
            userPassword,
        );

        if (isCredentialsValid.isLeft()) {
            return left(Result.fail('Credentials did not match'));
        }

        const user = await this.userRepo.getUserByUsername(userUsername);

        const userHasSession = await this.sessionService.userHasSession(user);

        if (userHasSession) {
            await this.sessionService.deleteUserSession(user);
        }

        await this.sessionService.createUserSession(user);

        return right(Result.ok());
    }
}
