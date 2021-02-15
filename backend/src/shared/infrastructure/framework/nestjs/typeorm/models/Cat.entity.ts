import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Room } from './Room.entity';

@Entity({ name: 'cats' })
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

    @ManyToOne(
        () => Room,
        room => room.cats,
    )
    @JoinColumn()
    room: Room;

    @Column({
        type: 'uuid',
        nullable: false,
    })
    room_id: string;
}
