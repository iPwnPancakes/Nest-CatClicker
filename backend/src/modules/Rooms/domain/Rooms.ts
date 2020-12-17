import { WatchedList } from '../../../shared/domain/WatchedList';
import { Room } from './Room';

export class Rooms extends WatchedList<Room> {
    private constructor(initialRooms: Room[]) {
        super(initialRooms);
    }

    public static create(initialRooms?: Room[]): Rooms {
        return new Rooms(initialRooms ?? []);
    }

    public compareItems(a: Room, b: Room) {
        return a.equals(b);
    }
}
