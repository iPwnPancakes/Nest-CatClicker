import { Provider } from '@nestjs/common';
import { NestDecorationRepository } from '../../repositories/adapters/nestDecorationRepository';
import { IDecorationRepository } from '../../repositories/ports/decorationRepository';

export const DecorationRepositoryProvider: Provider = {
    provide: IDecorationRepository,
    useClass: NestDecorationRepository,
};
