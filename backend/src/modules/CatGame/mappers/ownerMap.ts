import { Mapper } from '../../../shared/infrastructure/Mapper';
import { Owner } from '../domain/Owner';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';

export class OwnerMap implements Mapper<Owner> {
    public static toDTO(owner: Owner) {
        return {
            id: owner.id,
            user_id: owner.userId,
        };
    }

    public static toDomain(raw: any): Owner {
        const ownerOrError = Owner.create(
            {
                user_id: raw.user_id,
            },
            new UniqueEntityId(raw.id),
        );

        if (ownerOrError.isFailure) {
            console.error(ownerOrError.error);
        }

        return ownerOrError.isSuccess ? ownerOrError.getValue() : null;
    }

    public static async toPersistence(owner: Owner): Promise<any> {
        return {
            id: owner.ownerId.id.toString(),
            user_id: owner.userId.id.toString(),
        };
    }
}
