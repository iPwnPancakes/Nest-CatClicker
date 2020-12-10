import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { CatId } from './CatId';
import { CatLevel } from './CatLevel';

interface CatProps {
    name: string;
    currentCatLevel: CatLevel;
}

export class Cat extends AggregateRoot<CatProps> {
    get catId() {
        return CatId.create(this._id).getValue();
    }

    get name() {
        return this.props.name;
    }

    get catLevelId() {
        return this.props.currentCatLevel;
    }
}