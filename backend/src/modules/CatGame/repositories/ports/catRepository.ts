import { Cat } from '../../domain/Cat';
import { Cats } from '../../domain/Cats';

export const ICatRepository = Symbol('ICatRepository');

export interface ICatRepository {
    exists(catId: string): Promise<boolean>;
    getCatByCatId(catId: string): Promise<Cat>;
    getCatsByRoomId(roomId: string): Promise<Cat[]>;
    save(cat: Cat): Promise<void>;
    delete(cat: Cat): Promise<void>;
    saveBulk(cats: Cats): Promise<void>;
}
