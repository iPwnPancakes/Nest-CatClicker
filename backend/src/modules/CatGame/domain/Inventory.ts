import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Cats } from './Cats';
import { Decorations } from './Decorations';
import { Rooms } from './Rooms';
import { InventoryId } from './InventoryId';
import { InventoryOwner } from './InventoryOwner';

interface InventoryProps {
    owner: InventoryOwner;
    cats: Cats;
    decorations: Decorations;
    rooms: Rooms;
}

export class Inventory extends AggregateRoot<InventoryProps> {
    private constructor(props: InventoryProps, id: UniqueEntityId) {
        super(props, id);
    }

    public static create(
        props: InventoryProps,
        id?: UniqueEntityId,
    ): Result<Inventory> {
        return Result.ok<Inventory>(new Inventory(props, id));
    }

    get inventoryId(): InventoryId {
        return InventoryId.create(this._id).getValue();
    }

    get owner(): InventoryOwner {
        return this.props.owner;
    }

    get cats(): Cats {
        return this.props.cats;
    }

    get decorations(): Decorations {
        return this.props.decorations;
    }

    get rooms(): Rooms {
        return this.props.rooms;
    }
}
