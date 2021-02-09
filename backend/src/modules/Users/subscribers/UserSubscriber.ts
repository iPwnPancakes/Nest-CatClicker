import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { User } from '../../../shared/infrastructure/framework/nestjs/typeorm/models/User.entity';
import { AfterUserCreated } from '../../CatGame/subscriptions/afterUserCreated';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection: Connection, afterUserCreated: AfterUserCreated) {
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
