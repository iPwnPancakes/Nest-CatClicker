import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSessionTable1619328902780 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'sessions',
                columns: [
                    {
                        name: 'id',
                        type: 'text',
                        isPrimary: true,
                        isUnique: true,
                    },
                    {
                        name: 'user_id',
                        type: 'text',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'expires_at',
                        type: 'text',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('sessions');
    }
}
