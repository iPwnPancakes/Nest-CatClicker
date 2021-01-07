import { WatchedList } from '../../../shared/domain/WatchedList';
import { DecorationEffect } from './DecorationEffect';

export class DecorationEffects extends WatchedList<DecorationEffect> {
    private constructor(initialEffects: DecorationEffect[]) {
        super(initialEffects);
    }

    public static create(initialEffects?: DecorationEffect[]): DecorationEffects {
        return new DecorationEffects(initialEffects ?? []);
    }

    public compareItems(a: DecorationEffect, b: DecorationEffect) {
        return a.equals(b);
    }
}
