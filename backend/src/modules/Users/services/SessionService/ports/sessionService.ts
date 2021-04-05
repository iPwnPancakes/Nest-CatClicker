import { User } from '../../../domain/User';

export const ISessionService = Symbol('ISessionService');

export interface ISessionService {
    createUserSession(user: User): Promise<void>;
    deleteUserSession(user: User): Promise<void>;
    userHasSession(user: User): Promise<boolean>;
    getSessionIdByUser(user: User): Promise<string>;
    checkIfSessionExpired(sessionId: string): Promise<boolean>;
}
