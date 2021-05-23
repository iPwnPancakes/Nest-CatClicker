import { Session } from "../../domain/Session";

export interface ISessionRepository {
    existsBySessionID(sessionID: string): Promise<boolean>;
    existsByUserID(userID: string): Promise<boolean>;
    getSessionBySessionID(sessionID: string): Promise<Session>;
    getSessionByUserID(userID: string): Promise<Session>;
    save(session: Session): Promise<void>;
    delete(session: Session): Promise<void>;
}
