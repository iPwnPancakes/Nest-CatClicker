import { Session } from '../../../../../shared/infrastructure/sessions/typeorm/models/Session.entity';
import { User } from '../../../domain/User';

export const ISessionService = Symbol('ISessionService');

export interface ISessionService {
    createUserSession(user: User): Promise<void>;
    deleteUserSession(user: User): Promise<void>;
    userHasSession(user: User): Promise<boolean>;
    getSessionByUser(user: User): Promise<Session>;
    checkIfSessionExpired(sessionId: string): Promise<boolean>;
    getSessionBySessionID(sessionId: string): Promise<Session>;
}
