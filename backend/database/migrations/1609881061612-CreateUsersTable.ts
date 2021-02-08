import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1609881061612 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'text',
                        isPrimary: true,
                        isUnique: true,
                    },
                    {
                        name: 'email',
                        type: 'text',
                        isUnique: true,
                    },
                    {
                        name: 'username',
                        type: 'text',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'text',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
