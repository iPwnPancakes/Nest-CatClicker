import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { RoomLevelId } from './RoomLevelId';

interface RoomLevelProps {
    max_cat_amount: number;
    max_decoration_amount: number;
}

export class RoomLevel extends Entity<RoomLevelProps> {
    get roomLevelId(): RoomLevelId {
        return RoomLevelId.create(this._id).getValue();
    }

    get max_cats(): number {
        return this.props.max_cat_amount;
    }

    get max_decorations(): number {
        return this.props.max_decoration_amount;
    }

    public static create(
        props: RoomLevelProps,
        id?: UniqueEntityId,
    ): Result<RoomLevel> {
        const guardResult = Guard.combine([
            Guard.greaterThan(0, props.max_cat_amount),
            Guard.greaterThan(0, props.max_decoration_amount),
        ]);

        if (!guardResult.succeeded) {
            return Result.fail<RoomLevel>(guardResult.message);
        }

        return Result.ok<RoomLevel>(new RoomLevel(props, id));
    }
}
