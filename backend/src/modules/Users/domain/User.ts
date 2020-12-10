import { v4 as uuid } from 'uuid';

interface UserProps<ID> {
    username: string;
    email: string;
    kibble: number;
    user_inventory_id: ID;
}

export class User<ID> {
    private _id: ID;

    public readonly props: UserProps<ID>;
    
    constructor(props: UserProps<ID>, _id: ID) {
        this._id = _id;
        this.props = props;
    }

    get userId() {
        if(!this._id) {
            this._id = uuid();
        }

        return this._id;
    }
}