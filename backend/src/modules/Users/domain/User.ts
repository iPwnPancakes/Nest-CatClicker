import { Entity } from '../../../shared/domain/Entity';
import { UserId } from './UserId';

interface UserProps {
    username: string;
    email: string;
    kibble: number;
    user_inventory_id: UserId;
}

export class User extends Entity<UserProps> {
    get userId() {
        return UserId.create(this._id);
    }
}
