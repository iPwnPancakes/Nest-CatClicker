import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { User } from '../User';

export class UserCreated implements IDomainEvent {
    public dateTimeOccured: Date;
    private user;

    constructor(user: User) {
        this.user = user;
    }

    getAggregateId(): UniqueEntityId {
        return this.user.id;
    }
}
