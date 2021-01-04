import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn({
        type: 'uuid',
        nullable: false,
        unique: true,
    })
    id: string;

    @Column({
        type: 'string',
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: 'string',
        nullable: false,
        unique: true,
    })
    username: string;
}
