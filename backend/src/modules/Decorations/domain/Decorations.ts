import { WatchedList } from '../../../shared/domain/WatchedList';
import { Decoration } from './Decoration';

export class Decorations extends WatchedList<Decoration> {
    private constructor(initialDecorations: Decoration[]) {
        super(initialDecorations);
    }

    public static create(initialDecorations?: Decoration[]) {
        return new Decorations(initialDecorations ?? []);
    }

    public compareItems(a: Decoration, b: Decoration): boolean {
        return a.equals(b);
    }
}
