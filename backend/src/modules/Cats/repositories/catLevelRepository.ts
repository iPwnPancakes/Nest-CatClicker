import { CatLevel } from '../domain/CatLevel';

export interface ICatLevelRepository {
    exists(catLevelId: string): Promise<boolean>;
    getCatLevelByCatLevelId(catLevelId: string): Promise<CatLevel>;
    getCatLevelByCatId(catId: string): Promise<CatLevel>;
    getCatLevelsByOwnerId(ownerId: string): Promise<CatLevel[]>;
    save(catLevel: CatLevel): Promise<void>;
    deleteCatLevel(catLevel: CatLevel): Promise<void>;
}
