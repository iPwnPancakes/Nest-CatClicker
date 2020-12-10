import { UniqueEntityId } from './UniqueEntityId';

export abstract class Entity<T> {
    protected readonly _id: UniqueEntityId;
    public readonly props: T;

    constructor(props: T, id?: UniqueEntityId) {
        this._id = id ? id : new UniqueEntityId();
        this.props = props;
    }

    public equals(object?: Entity<T>): boolean {
        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!Entity.isEntity(object)) {
            return false;
        }

        return this._id.equals(object._id);
    }

    public static isEntity(val: any): val is Entity<any> {
        return val instanceof Entity;
    }
}
