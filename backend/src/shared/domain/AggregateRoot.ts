import { Entity } from './Entity';
import { DomainEvents } from './events/DomainEvents';
import { IDomainEvent } from './events/IDomainEvent';
import { UniqueEntityId } from './UniqueEntityId';

export abstract class AggregateRoot<T> extends Entity<T> {
    private _domainEvents: IDomainEvent[] = [];

    get id(): UniqueEntityId {
        return this._id;
    }

    get domainEvents(): IDomainEvent[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: IDomainEvent): void {
        this.domainEvents.push(domainEvent);

        DomainEvents.markAggregateForDispatch(this);
    }

    public clearEvents(): void {
        this._domainEvents.splice(0, this._domainEvents.length);
    }
}
