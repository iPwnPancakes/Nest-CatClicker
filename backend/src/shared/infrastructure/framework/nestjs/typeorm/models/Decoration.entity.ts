import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Room } from './Room.entity';

@Entity({ name: 'decorations' })
export class Decoration {
    @PrimaryColumn({
        type: 'uuid',
        nullable: false,
        unique: true,
    })
    id: string;

    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        type: 'double',
        nullable: false,
    })
    cat_click_multiplier: number;

    @ManyToOne(
        () => Room,
        room => room.decorations,
    )
    @JoinColumn()
    room: Room;
}
