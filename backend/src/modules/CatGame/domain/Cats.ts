import { WatchedList } from '../../../shared/domain/WatchedList';
import { Cat } from './Cat';

export class Cats extends WatchedList<Cat> {
    private constructor(initialCats: Cat[]) {
        super(initialCats);
    }

    public static create(initialCats?: Cat[]): Cats {
        if (!Array.isArray(initialCats)) {
            return new Cats([]);
        }

        if (!initialCats.every(item => item instanceof Cat)) {
            return new Cats([]);
        }

        return new Cats(initialCats);
    }

    public compareItems(a: Cat, b: Cat): boolean {
        return a.equals(b);
    }
}
