import { v4 as uuid } from 'uuid';

export enum DecorationEffectEnum {
    INCREASE_PRODUCTIVITY_X1_5,
    INCREASE_PRODUCTIVITY_X2
}

interface DecorationProps {
    effects: DecorationEffectEnum[];
}

export class Decoration<ID> {
    private _id: ID;

    public readonly props: DecorationProps;

    constructor(props: DecorationProps, _id: ID) {
        this._id = _id;
        this.props = props;
    }

    get decorationId() {
        if(!this._id) {
            this._id = uuid();
        }

        return this._id;
    }

    get effects() {
        return this.props.effects;
    }
}
