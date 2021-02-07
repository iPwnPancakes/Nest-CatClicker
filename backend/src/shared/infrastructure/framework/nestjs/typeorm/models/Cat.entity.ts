import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Inventory } from './Inventory.entity';

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

    @ManyToOne(
        () => Inventory,
        inventory => inventory.cats,
    )
    inventory: Inventory;
}
