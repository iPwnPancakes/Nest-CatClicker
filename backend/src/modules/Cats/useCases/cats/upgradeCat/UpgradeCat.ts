import { UseCase } from '../../../../../shared/core/UseCase';
import { CatId } from '../../../domain/CatId';
import { CatLevelId } from '../../../domain/CatLevelId';

interface UpgradeCatDTO {
    catId: CatId;
    levelId: CatLevelId;
}

export class UpgradeCat implements UseCase<UpgradeCatDTO, Promise<any>> {
    private catRepo: ICatRepo;
    private catLevelRepo: ICatLevelRepo;

    constructor(catRepo: ICatRepo, catLevelRepo: ICatLevelRepo) {
        this.catRepo = catRepo;
        this.catLevelRepo = catLevelRepo;
    }

    public async execute(req: UpgradeCatDTO): Promise<any> {}
}
