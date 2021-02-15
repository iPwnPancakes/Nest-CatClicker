import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Mapper } from '../../../shared/infrastructure/Mapper';
import { Cat } from '../domain/Cat';

export class CatMapper implements Mapper<Cat> {
    public static toDomain(raw: any): Cat {
        const catOrError = Cat.create(
            {
                name: raw.name,
                clickRate: raw.clickRate,
            },
            new UniqueEntityId(raw.id),
        );

        return catOrError.isSuccess ? catOrError.getValue() : null;
    }

    public static async toPersistence(cat: Cat): Promise<any> {
        return {
            id: cat.catId.id.toString(),
            name: cat.name,
            clickRate: cat.clickRate,
        };
    }
}
