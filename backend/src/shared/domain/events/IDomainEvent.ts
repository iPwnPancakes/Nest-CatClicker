import { UniqueEntityId } from '../UniqueEntityId';

export interface IDomainEvent {
    dateTimeOccured: Date;
    getAggregateId(): UniqueEntityId;
}
