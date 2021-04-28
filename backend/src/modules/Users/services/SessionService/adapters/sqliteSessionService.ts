import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../domain/User';
import { ISessionService } from '../ports/sessionService';
import { Database } from 'sqlite';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SqliteSessionService implements ISessionService {
    constructor(@Inject('SQLITE_CONNECTION') private db: Database) {}

    async createUserSession(user: User): Promise<void> {
        const sql = `INSERT INTO sessions (id, user_id, expires_at) VALUES ($id, $user_id, $expires_at)`;

        const now = new Date();
        now.setDate(now.getDate() + 7);

        await this.db.run(sql, {
            $id: uuid(),
            $user_id: user.userId.id.toString(),
            $expires_at: now.toUTCString(),
        });
    }

    async deleteUserSession(user: User): Promise<void> {
        const sql = `DELETE FROM sessions WHERE user_id = $user_id`;

        await this.db.run(sql, { $user_id: user.userId.id.toString() });
    }

    async userHasSession(user: User): Promise<boolean> {
        const sql = `SELECT * FROM sessions WHERE user_id = ?`;

        const result = await this.db.get(sql, [user.userId.id.toString()]);

        if (!result) {
            return false;
        }

        return true;
    }

    async getSessionIdByUser(user: User): Promise<string> {
        const sql = `SELECT * FROM sessions WHERE user_id = $user_id`;

        const result = await this.db.get(sql, {
            $user_id: user.userId.id.toString(),
        });

        if (!result) {
            throw new Error('User does not have a session');
        }

        return result.id;
    }

    async checkIfSessionExpired(sessionId: string): Promise<boolean> {
        const sql = `SELECT * FROM sessions WHERE id = $id`;

        const result = await this.db.get(sql, { $id: sessionId });

        if (!result) {
            throw new Error('No session with that ID');
        }

        if (!result.expires_at) {
            throw new Error(
                'Session query result does not include expiry_date column',
            );
        }

        if (
            Date.parse(result.expires_at) >=
            Date.parse(new Date().toUTCString())
        ) {
            return true;
        }

        return false;
    }
}
