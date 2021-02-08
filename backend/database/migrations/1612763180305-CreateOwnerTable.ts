import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class CreateOwnerTable1612763180305 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'owners',
                columns: [
                    {
                        name: 'id',
                        type: 'text',
                        isPrimary: true,
                        isUnique: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.addColumn(
            'owners',
            new TableColumn({
                name: 'user_id',
                type: 'text',
            }),
        );

        await queryRunner.createForeignKey(
            'owners',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('owners', 'user_id');
        await queryRunner.dropTable('owners');
    }
}
