import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { UserId } from '../../Users/domain/UserId';
import { InventoryOwnerId } from './InventoryOwnerId';

interface InventoryOwnerProps {
    userId: UserId;
    kibble: number;
}

export class InventoryOwner extends Entity<InventoryOwnerProps> {
    private constructor(props: InventoryOwnerProps, id: UniqueEntityId) {
        super(props, id);
    }

    public static create(
        props: InventoryOwnerProps,
        id?: UniqueEntityId,
    ): Result<InventoryOwner> {
        const guardResult = Guard.combine([
            Guard.greaterThan(0, props.kibble),
            Guard.againstNullOrUndefined(props.userId, 'userId'),
        ]);

        if (!guardResult.succeeded) {
            return Result.fail<InventoryOwner>(guardResult.message);
        }

        return Result.ok<InventoryOwner>(new InventoryOwner(props, id));
    }

    get inventoryOwnerId(): InventoryOwnerId {
        return InventoryOwnerId.create(this._id).getValue();
    }

    get kibble(): number {
        return this.props.kibble;
    }

    public updateInventoryOwner(newUserId: UserId): void {
        // Dispatch events
        this.props.userId = newUserId;
    }
}
