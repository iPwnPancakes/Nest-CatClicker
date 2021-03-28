import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

export const SqliteDatabaseConnectionFactory = {
    provide: 'SQLITE_CONNECTION',
    useFactory: async (): Promise<Database> => {
        return await open({
            filename: process.env.SQLITE_DB_PATH,
            driver: sqlite3.Database,
        });
    },
};
