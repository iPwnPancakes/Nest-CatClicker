import { Logger } from '@nestjs/common';
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm';
import { DomainEvents } from '../../../../domain/events/DomainEvents';
import { UniqueEntityId } from '../../../../domain/UniqueEntityId';

@EventSubscriber()
export class TypeOrmEntitySubscriber implements EntitySubscriberInterface {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
        Logger.log('TypeOrm entity hooks setup', this.constructor.name);
    }

    afterInsert(event: InsertEvent<any>) {
        DomainEvents.dispatchEventsForAggregate(
            new UniqueEntityId(event.entity.id),
        );
    }

    afterRemove(event: RemoveEvent<any>) {
        DomainEvents.dispatchEventsForAggregate(
            new UniqueEntityId(event.entityId),
        );
    }

    afterUpdate(event: UpdateEvent<any>) {
        DomainEvents.dispatchEventsForAggregate(
            new UniqueEntityId(event.entity.id),
        );
    }
}
