import { UseCase } from '../../../../../shared/core/UseCase';
import { CatId } from '../../../domain/CatId';
import { CatLevelId } from '../../../domain/CatLevelId';
import { ICatLevelRepository } from '../../../repositories/catLevelRepository';
import { ICatRepository } from '../../../repositories/catRepository';

interface UpgradeCatDTO {
    catId: CatId;
    levelId: CatLevelId;
}

export class UpgradeCat implements UseCase<UpgradeCatDTO, Promise<any>> {
    private catRepo: ICatRepository;
    private catLevelRepo: ICatLevelRepository;

    constructor(catRepo: ICatRepository, catLevelRepo: ICatLevelRepository) {
        this.catRepo = catRepo;
        this.catLevelRepo = catLevelRepo;
    }

    public async execute(req: UpgradeCatDTO): Promise<any> {
        return { ok: true };
    }
}
