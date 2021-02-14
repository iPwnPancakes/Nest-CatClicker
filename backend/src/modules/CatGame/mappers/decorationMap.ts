import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Mapper } from '../../../shared/infrastructure/Mapper';
import { Decoration } from '../domain/Decoration';

export class DecorationMap implements Mapper<Decoration> {
    public static toDomain(raw: any) {
        const decorationOrError = Decoration.create(
            {
                owner_id: raw.owner_id,
                name: raw.name,
                cat_click_multiplier: raw.cat_click_multiplier,
                conditions: raw.conditions,
            },
            new UniqueEntityId(raw.id),
        );

        if (decorationOrError.isFailure) {
            console.error(decorationOrError.error);
        }

        return decorationOrError.isSuccess
            ? decorationOrError.getValue()
            : null;
    }

    public static async toPersistence(decoration: Decoration): Promise<any> {
        return {
            id: decoration.decorationId.id.toString(),
            owner_id: decoration.ownerId.id.toString(),
            cat_click_multiplier: decoration.catClickMultiplier,
            name: decoration.name,
        };
    }
}
