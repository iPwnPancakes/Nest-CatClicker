import { Mapper } from '../../../shared/infrastructure/Mapper';
import { Cats } from '../domain/Cats';
import { Decorations } from '../domain/Decorations';
import { OwnerId } from '../domain/OwnerId';
import { Room } from '../domain/Room';

export class RoomMapper implements Mapper<Room> {
    public static toDomain(raw: any) {
        const cats = Cats.create(raw.cats);

        const decorations = Decorations.create(raw.decorations);

        const roomOrError = Room.create({
            name: raw.name,
            maxCatAmount: raw.maxCatAmount,
            owner_id: OwnerId.create(raw.owner_id).getValue(),
            cats: cats,
            decorations: decorations,
        });

        return roomOrError.isSuccess ? roomOrError.getValue() : null;
    }

    public static async toPersistence(room: Room): Promise<any> {
        return {
            id: room.roomId.id.toString(),
            name: room.name,
            max_cat_amount: room.maxCatAmount,
            owner_id: room.ownerId.id.toString(),
        };
    }
}
