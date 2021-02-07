import { AggregateRoot } from '../AggregateRoot';
import { UniqueEntityId } from '../UniqueEntityId';
import { IDomainEvent } from './IDomainEvent';

export type DomainEventHandler = (event: IDomainEvent) => void;

export class DomainEvents {
    private static handlersMap = new Map<string, DomainEventHandler[]>();
    private static markedAggregates: AggregateRoot<any>[] = [];

    public static markAggregateForDispatch(
        aggregate: AggregateRoot<any>,
    ): void {
        const aggregateFound = Boolean(
            this.findMarkedAggregateByID(aggregate.id),
        );

        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }

    public static registerHandler(
        handler: DomainEventHandler,
        eventClassName: string,
    ): void {
        if (!this.handlersMap.has(eventClassName)) {
            const handlers = this.handlersMap.get(eventClassName);

            this.handlersMap.set(eventClassName, [...handlers, handler]);
        }
    }

    public static dispatchEventsForAggregate(id: UniqueEntityId): void {
        const aggregate = this.findMarkedAggregateByID(id);

        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }

    public static clearHandlers(): void {
        this.handlersMap.clear();
    }

    public static clearMarkedAggregates(): void {
        this.markedAggregates = [];
    }

    private static removeAggregateFromMarkedDispatchList(
        aggregate: AggregateRoot<any>,
    ): void {
        const index = this.markedAggregates.findIndex(a => a.equals(aggregate));

        if (index !== -1) {
            this.markedAggregates.splice(index, 1);
        }
    }

    private static findMarkedAggregateByID(
        id: UniqueEntityId,
    ): AggregateRoot<any> {
        let found: AggregateRoot<any> = null;

        for (const aggregate of this.markedAggregates) {
            if (aggregate.id.equals(id)) {
                found = aggregate;
            }
        }

        return found;
    }

    private static dispatchAggregateEvents(
        aggregate: AggregateRoot<any>,
    ): void {
        aggregate.domainEvents.forEach((event: IDomainEvent) =>
            this.dispatch(event),
        );
    }

    private static dispatch(event: IDomainEvent): void {
        const eventClassName: string = event.constructor.name;

        if (this.handlersMap.has(eventClassName)) {
            const handlers = this.handlersMap.get(eventClassName);

            for (const handler of handlers) {
                handler(event);
            }
        }
    }
}
