import {
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'owner' })
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
}
