import { Provider } from '@nestjs/common';
import { SqliteSessionService } from '../../services/SessionService/adapters/sqliteSessionService';
import { ISessionService } from '../../services/SessionService/ports/sessionService';

export const SessionServiceProvider: Provider = {
    provide: ISessionService,
    useClass: SqliteSessionService,
};
