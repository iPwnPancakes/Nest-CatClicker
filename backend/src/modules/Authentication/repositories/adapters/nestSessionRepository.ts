import { Session } from '../../domain/Session';
import { ISessionRepository } from '../ports/ISessionRepository';

export class NestSessionRepository implements ISessionRepository {
    existsBySessionID(sessionID: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    existsByUserID(userID: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getSessionBySessionID(sessionID: string): Promise<Session> {
        throw new Error('Method not implemented.');
    }
    getSessionByUserID(userID: string): Promise<Session> {
        throw new Error('Method not implemented.');
    }
    save(session: Session): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(session: Session): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
