import { WatchedList } from '../../../shared/domain/WatchedList';
import { Decoration } from './Decoration';

export class Decorations extends WatchedList<Decoration> {
    private constructor(initialDecorations: Decoration[]) {
        super(initialDecorations);
    }

    public static create(initialDecorations?: Decoration[]) {
        if (!Array.isArray(initialDecorations)) {
            return new Decorations([]);
        }

        if (!initialDecorations.every(item => item instanceof Decoration)) {
            return new Decorations([]);
        }

        return new Decorations(initialDecorations);
    }

    public compareItems(a: Decoration, b: Decoration): boolean {
        return a.equals(b);
    }
}
