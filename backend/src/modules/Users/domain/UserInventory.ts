import { Entity } from '../../../shared/domain/Entity';
import { CatId } from '../../Cats/domain/CatId';
import { DecorationId } from '../../Cats/domain/DecorationId';
import { RoomId } from '../../Cats/domain/RoomId';
import { UserInventoryId } from './UserInventoryId';

interface UserInventoryProps {
    catIds: CatId[];
    decorationIds: DecorationId[];
    roomIds: RoomId[];
}

export class UserInventory extends Entity<UserInventoryProps> {
    get userInventoryId() {
        return UserInventoryId.create(this._id);
    }

    get catIds(): CatId[] {
        return this.props.catIds;
    }

    get decorationIds(): DecorationId[] {
        return this.props.decorationIds;
    }

    get roomIds(): RoomId[] {
        return this.props.roomIds;
    }
}
