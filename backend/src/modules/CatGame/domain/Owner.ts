import { Result } from '../../../shared/core/Result';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UserId } from '../../Users/domain/UserId';
import { OwnerId } from './OwnerId';
import { Cat } from './Cat';
import { Decoration } from './Decoration';
import { Room } from './Room';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Inventory } from './Inventory';

interface OwnerProps {
    userId: UserId;
    inventory: Inventory;
}

export class Owner extends AggregateRoot<OwnerProps> {
    private constructor(props: OwnerProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(
        props: OwnerProps,
        id?: UniqueEntityId,
    ): Result<Owner> {
        return Result.ok<Owner>(new Owner(props, id));
    }

    get ownerId(): OwnerId {
        return OwnerId.create(this._id).getValue();
    }

    get userId(): UserId {
        return this.props.userId;
    }

    get cats(): Cat[] {
        return this.props.inventory.cats.getItems();
    }

    get decorations(): Decoration[] {
        return this.props.inventory.decorations.getItems();
    }

    get rooms(): Room[] {
        return this.props.inventory.rooms.getItems();
    }

    public addCat(cat: Cat) {
        const exists = this.props.inventory.cats.exists(cat);

        if (exists) {
            throw new Error('Cat already exists in inventory');
        }

        this.props.inventory.cats.add(cat);
    }

    public removeCat(cat: Cat) {
        const exists = this.props.inventory.cats.exists(cat);

        if (!exists) {
            throw new Error('Cat does not exist in inventory');
        }

        this.props.inventory.cats.remove(cat);
    }

    public addDecoration(decoration: Decoration) {
        const exists = this.props.inventory.decorations.exists(decoration);

        if (exists) {
            throw new Error('Decoration already exists in inventory');
        }

        this.props.inventory.decorations.add(decoration);
    }

    public removeDecoration(decoration: Decoration) {
        const exists = this.props.inventory.decorations.exists(decoration);

        if (!exists) {
            throw new Error('Decoration does not exist in inventory');
        }

        this.props.inventory.decorations.remove(decoration);
    }

    public addRoom(room: Room) {
        const exists = this.props.inventory.rooms.exists(room);

        if (exists) {
            throw new Error('Room already exists in inventory');
        }

        this.props.inventory.rooms.add(room);
    }

    public removeRoom(room: Room) {
        const exists = this.props.inventory.rooms.exists(room);

        if (exists) {
            throw new Error('Room does not exist in inventory');
        }

        this.props.inventory.rooms.remove(room);
    }
}
