import { Provider } from '@nestjs/common';
import { NestOwnerRepository } from '../../repositories/adapters/nestOwnerRepository';
import { IOwnerRepository } from '../../repositories/ports/ownerRepository';

export const OwnerRepositoryProvider: Provider = {
    provide: IOwnerRepository,
    useClass: NestOwnerRepository,
};
