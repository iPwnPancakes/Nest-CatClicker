import { Inject, Injectable } from '@nestjs/common';
import { left, Result, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { IUserRepository } from '../../repositories/ports/userRepository';
import { GetUserByEmailDTO } from './GetUserByEmailDTO';
import { GetUserByEmailResponse } from './GetUserByEmailResponse';

@Injectable()
export class GetUserByEmail
    implements UseCase<GetUserByEmailDTO, Promise<GetUserByEmailResponse>> {
    constructor(@Inject(IUserRepository) private userRepo: IUserRepository) {}

    async execute(
        request?: GetUserByEmailDTO,
    ): Promise<GetUserByEmailResponse> {
        const emailOrError = UserEmail.create(request.email);

        if (emailOrError.isFailure) {
            return left(Result.fail(emailOrError.error.toString()));
        }

        const email = emailOrError.getValue();

        const user: User = await this.userRepo.getUserByEmail(email);

        return right(Result.ok(user));
    }
}
