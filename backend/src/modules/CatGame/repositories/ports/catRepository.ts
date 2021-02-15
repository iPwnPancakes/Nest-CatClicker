import { Cat } from '../../domain/Cat';

export interface ICatRepository {
    exists(catId: string): Promise<boolean>;
    getCatByCatId(catId: string): Promise<Cat>;
    getCatsByRoomId(roomId: string): Promise<Cat[]>;
    save(cat: Cat): Promise<void>;
    delete(cat: Cat): Promise<void>;
    saveBulk(cats: Cat[]): Promise<void>;
}
