import { v4 as uuid } from 'uuid';

export enum RoomEffectEnum {
    INCREASE_KIBBLE_PRODUCTION_X1_1,
    INCREASE_KIBBLE_PRODUCTION_X1_5
}

interface RoomProps<ID> {
    current_room_level_id: ID;
    effects: RoomEffectEnum[]
}

export class Room<ID> {
    private _id: ID;

    public readonly props: RoomProps<ID>;

    constructor(props: RoomProps<ID>, _id: ID) {
        this._id = _id;
        this.props = props;
    }

    get roomId() {
        if(!this._id) {
            this._id = uuid();
        }

        return this._id;
    }

    get effects() {
        return this.props.effects;
    }
}