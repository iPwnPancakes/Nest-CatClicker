import { Guard, IGuardArgument } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { CatId } from '../../Cats/domain/CatId';
import { DecorationId } from '../../Cats/domain/DecorationId';
import { RoomId } from '../../Cats/domain/RoomId';
import { UserInventoryId } from './UserInventoryId';

interface UserInventoryProps {
    catIds: CatId[];
    decorationIds: DecorationId[];
    roomIds: RoomId[];
}

export class UserInventory extends Entity<UserInventoryProps> {
    get userInventoryId() {
        return UserInventoryId.create(this._id);
    }

    get catIds(): CatId[] {
        return this.props.catIds;
    }

    get decorationIds(): DecorationId[] {
        return this.props.decorationIds;
    }

    get roomIds(): RoomId[] {
        return this.props.roomIds;
    }

    private constructor(props: UserInventoryProps, id?: UniqueEntityId) {
        super(props, id);
    }

    public static create(
        props: UserInventoryProps,
        id?: UniqueEntityId,
    ): Result<UserInventory> {
        const guardArgs: IGuardArgument[] = [
            { argument: props.catIds, argumentName: 'CatIds' },
            { argument: props.decorationIds, argumentName: 'DecorationIds' },
            { argument: props.roomIds, argumentName: 'RoomIds' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

        if (!guardResult.succeeded) {
            return Result.fail<UserInventory>(guardResult.message);
        }

        return Result.ok<UserInventory>(new UserInventory(props, id));
    }
}
