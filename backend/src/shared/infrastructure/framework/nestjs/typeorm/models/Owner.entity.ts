import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';
import { Room } from './Room.entity';
import { User } from './User.entity';

@Entity({ name: 'owners' })
export class Owner {
    @PrimaryColumn({
        type: 'uuid',
        nullable: false,
        unique: true,
    })
    id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        type: 'uuid',
        nullable: false,
        unique: true,
    })
    user_id: string;

    @OneToMany(
        () => Room,
        room => room.owner,
    )
    @JoinColumn()
    rooms: Room[];
}
