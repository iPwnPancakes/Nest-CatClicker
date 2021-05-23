import { Inject } from '@nestjs/common';
import { Result, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { IUserRepository } from '../../repositories/ports/userRepository';
import { ISessionService } from '../../services/SessionService/ports/sessionService';
import { GetUserFromSessionIDDTO } from './GetUserFromSessionIDDTO';
import { GetUserFromSessionIDResponse } from './GetUserFromSessionIDResponse';

export class GetUserFromSessionID
    implements
        UseCase<
            GetUserFromSessionIDDTO,
            Promise<GetUserFromSessionIDResponse>
        > {
    constructor(
        @Inject(ISessionService) private sessionService: ISessionService,
        @Inject(IUserRepository) private userRepository: IUserRepository,
    ) {}

    async execute(
        request?: GetUserFromSessionIDDTO,
    ): Promise<GetUserFromSessionIDResponse> {
        const sessionID = request.sessionID;

        const session = await this.sessionService.getSessionBySessionID(
            sessionID,
        );
        const user = await this.userRepository.getUserByUserId(session.user_id);

        return right(Result.ok(user));
    }
}
