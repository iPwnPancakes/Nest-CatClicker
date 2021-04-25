import { Column, PrimaryColumn } from 'typeorm';

export class Session {
    @PrimaryColumn({
        type: 'uuid',
        nullable: false,
        unique: true,
    })
    id: string;

    @Column({
        type: 'uuid',
        nullable: false,
        unique: true,
    })
    user_id: string;

    @Column({
        type: 'datetime',
        nullable: false,
    })
    expires_at: string;
}
