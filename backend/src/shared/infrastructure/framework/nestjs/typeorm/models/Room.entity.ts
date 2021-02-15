import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { Cat } from './Cat.entity';
import { Decoration } from './Decoration.entity';
import { Owner } from './Owner.entity';

@Entity({ name: 'rooms' })
export class Room {
    @PrimaryColumn({
        type: 'uuid',
        nullable: false,
        unique: true,
    })
    id: string;

    @Column({
        type: 'text',
        nullable: false,
        unique: false,
    })
    name: string;

    @Column({
        type: 'integer',
        nullable: false,
    })
    max_cat_amount: number;

    @Column({
        type: 'uuid',
        nullable: false,
    })
    owner_id: string;

    @ManyToOne(
        () => Owner,
        owner => owner.rooms,
    )
    @JoinColumn()
    owner: Owner;

    @OneToMany(
        () => Cat,
        cat => cat.room,
    )
    @JoinColumn()
    cats: Cat[];

    @OneToMany(
        () => Decoration,
        decoration => decoration.room,
    )
    @JoinColumn()
    decorations: Decoration[];
}
