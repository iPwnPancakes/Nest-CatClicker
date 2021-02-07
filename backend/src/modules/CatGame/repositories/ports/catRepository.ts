import { Cat } from '../../domain/Cat';

export interface ICatRepository {
    exists(catId: string): Promise<boolean>;
    getCatByCatId(catId: string): Promise<Cat>;
    getCatsByLevel(levelId: string): Promise<Cat[]>;
    getCatsByOwnerId(ownerId: string): Promise<Cat[]>;
    save(cat: Cat): Promise<void>;
    deleteCat(cat: Cat): Promise<void>;
    saveBulk(cats: Cat[]): Promise<void>;
}
