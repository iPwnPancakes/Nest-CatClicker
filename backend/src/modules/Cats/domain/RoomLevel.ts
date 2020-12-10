import { v4 as uuid } from 'uuid';

interface RoomLevelProps {
    max_cat_amount: number;
    max_decoration_amount: number;
}

export class RoomLevel<ID> {
    private _id: ID;

    public readonly props: RoomLevelProps;

    constructor(props: RoomLevelProps, _id: ID) {
        this._id = _id;
        this.props = props;
    }

    get roomLevelId() {
        if(!this._id) {
            this._id = uuid();
        }

        return this._id;
    }

    get max_cats() {
        return this.props.max_cat_amount;
    }

    get max_decorations() {
        return this.props.max_decoration_amount;
    }
}