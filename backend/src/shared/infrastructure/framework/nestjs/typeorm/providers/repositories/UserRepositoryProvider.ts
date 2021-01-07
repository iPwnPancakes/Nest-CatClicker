import { ClassProvider } from '@nestjs/common';
import { NestUserRepository } from '../../../../../../../modules/Users/repositories/implementations/nestUserRepository';

export const UserRepositoryProvider: ClassProvider<NestUserRepository> = {
    provide: 'UserRepository',
    useClass: NestUserRepository,
};
