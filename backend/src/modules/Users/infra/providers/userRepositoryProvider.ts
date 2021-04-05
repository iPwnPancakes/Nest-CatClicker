import { IUserRepository } from '../../repositories/ports/userRepository';
import { NestUserRepository } from '../../repositories/adapters/nestUserRepository';
import { Provider } from '@nestjs/common';

export const UserRepositoryProvider: Provider = {
    provide: IUserRepository,
    useClass: NestUserRepository,
};
