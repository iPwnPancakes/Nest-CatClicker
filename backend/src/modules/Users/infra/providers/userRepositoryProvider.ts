import { IUserRepository } from '../../repositories/ports/userRepository';
import { NestUserRepository } from '../../repositories/adapters/nestUserRepository';

export const UserRepositoryProvider = {
    provide: IUserRepository,
    useClass: NestUserRepository,
};
