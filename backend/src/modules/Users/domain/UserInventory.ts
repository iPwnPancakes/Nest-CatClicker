import { v4 as uuid } from 'uuid';

interface UserInventoryProps<ID> {
    catIds: ID[];
    decorationIds: ID[];
    roomIds: ID[];
}

export class UserInventory<ID> {
    private _id: ID;

    public readonly props: UserInventoryProps<ID>;

    constructor(props: UserInventoryProps<ID>, _id: ID) {
        this._id = _id;
        this.props = props;
    }

    get userInventoryId() {
        if (!this._id) {
            this._id = uuid();
        }

        return this._id;
    }

    get catIds() {
        return this.props.catIds;
    }

    get decorationIds() {
        return this.props.decorationIds;
    }

    get roomIds() {
        return this.props.roomIds;
    }
}
