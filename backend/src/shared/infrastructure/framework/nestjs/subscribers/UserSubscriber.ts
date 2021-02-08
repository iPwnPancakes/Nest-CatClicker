import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm';
import { AfterUserCreated } from '../../../../../modules/CatGame/subscriptions/afterUserCreated';
import { DomainEvents } from '../../../../domain/events/DomainEvents';
import { UniqueEntityId } from '../../../../domain/UniqueEntityId';
import { User } from '../typeorm/models/User.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(
        connection: Connection,
        afterUserCreated: AfterUserCreated,
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    afterInsert(event: InsertEvent<User>) {
        DomainEvents.dispatchEventsForAggregate(
            new UniqueEntityId(event.entity.id),
        );
    }

    afterRemove(event: RemoveEvent<User>) {
        DomainEvents.dispatchEventsForAggregate(
            new UniqueEntityId(event.entity.id),
        );
    }

    afterUpdate(event: UpdateEvent<User>) {
        console.log('after update');
        DomainEvents.dispatchEventsForAggregate(
            new UniqueEntityId(event.entity.id),
        );
    }
}
