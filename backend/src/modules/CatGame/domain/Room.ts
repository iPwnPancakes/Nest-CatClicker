import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Cat } from './Cat';
import { Cats } from './Cats';
import { Decoration } from './Decoration';
import { Decorations } from './Decorations';
import { OwnerId } from './OwnerId';
import { RoomId } from './RoomId';

interface RoomProps {
    name: string;
    maxCatAmount: number;
    owner_id: OwnerId;
    cats: Cats;
    decorations: Decorations;
}

export class Room extends AggregateRoot<RoomProps> {
    private constructor(props: RoomProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(props: RoomProps, id?: UniqueEntityId): Result<Room> {
        const guardResult = Guard.againstAtLeast(3, props.name);

        if (!guardResult.succeeded) {
            return Result.fail<Room>(guardResult.message);
        }

        return Result.ok<Room>(new Room(props, id));
    }

    get roomId(): RoomId {
        return RoomId.create(this._id).getValue();
    }

    get ownerId(): OwnerId {
        return this.props.owner_id;
    }

    public upgradeRoomMaxCatAmount(newMaxAmount: number) {
        if (newMaxAmount < this.props.maxCatAmount) {
            throw new Error('Cannot lower max cat amount');
        }

        this.props.maxCatAmount = Math.floor(newMaxAmount);
    }

    public addCat(cat: Cat): void {
        if (this.props.cats.getItems().length >= this.props.maxCatAmount) {
            throw new Error('Room already at max capacity');
        }

        const exists = this.props.cats.exists(cat);

        if (exists) {
            throw new Error('Cat already exists');
        }

        this.props.cats.add(cat);
    }

    public removeCat(cat: Cat): void {
        const exists = this.props.cats.exists(cat);

        if (!exists) {
            throw new Error('Cat does not exist');
        }

        this.props.cats.remove(cat);
    }

    public addDecoration(decoration: Decoration) {
        const exists = this.props.decorations.exists(decoration);

        if (exists) {
            throw new Error('Decoration is already owned by owner');
        }

        this.props.decorations.add(decoration);
    }

    public removeDecoration(decoration: Decoration) {
        const exists = this.props.decorations.exists(decoration);

        if (!exists) {
            throw new Error('Decoration is not owned by owner');
        }

        this.props.decorations.remove(decoration);
    }
}
