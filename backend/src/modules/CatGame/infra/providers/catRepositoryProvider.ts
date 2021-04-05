import { Provider } from '@nestjs/common';
import { NestCatRepository } from '../../repositories/adapters/nestCatRepository';
import { ICatRepository } from '../../repositories/ports/catRepository';

export const CatRepositoryProvider: Provider = {
    provide: ICatRepository,
    useClass: NestCatRepository,
};
