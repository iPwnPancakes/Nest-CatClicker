import * as sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { Provider } from '@nestjs/common';

export const SqliteDatabaseConnectionFactory: Provider = {
    provide: 'SQLITE_CONNECTION',
    useFactory: async (): Promise<Database> => {
        return await open({
            filename: process.env.SQLITE_DB_PATH || ':memory:',
            driver: sqlite3.Database,
        });
    },
};
