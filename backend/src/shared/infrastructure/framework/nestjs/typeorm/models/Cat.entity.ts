import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cat' })
export class Cat {
    @PrimaryColumn({
        type: 'uuid',
        nullable: false,
        unique: true,
    })
    id: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'integer',
        nullable: false,
    })
    click_rate: number;
}
