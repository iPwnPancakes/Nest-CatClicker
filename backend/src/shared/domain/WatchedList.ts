export abstract class WatchedList<T> {
    public currentItems: T[];

    private initial: T[];
    private new: T[];
    private removed: T[];

    abstract compareItems(a: T, b: T): boolean;

    constructor(initialItems?: T[]) {
        this.currentItems = initialItems ?? [];
        this.initial = initialItems ?? [];
        this.new = [];
        this.removed = [];
    }

    // Public Queries

    public getItems(): T[] {
        return this.currentItems;
    }

    public getNewItems(): T[] {
        return this.new;
    }

    public getRemovedItems(): T[] {
        return this.removed;
    }

    public getInitialItems(): T[] {
        return this.initial;
    }

    public exists(item: T): boolean {
        return this.isCurrentItem(item);
    }

    // Public Commands

    public add(item: T): void {
        if (this.isRemovedItem(item)) {
            this.removeFromRemoved(item);
        }

        if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
            this.new.push(item);
        }

        if (!this.isCurrentItem(item)) {
            this.currentItems.push(item);
        }
    }

    public remove(item: T): void {
        this.removeFromCurrent(item);

        if (this.isNewItem(item)) {
            this.removeFromNew(item);
        } else if (!this.isRemovedItem(item)) {
            this.removed.push(item);
        }
    }

    // Private Queries

    private isCurrentItem(item: T): boolean {
        const index = this.currentItems.findIndex(currentItem =>
            this.compareItems(currentItem, item),
        );

        if (index === -1) {
            return false;
        }

        return true;
    }

    private isNewItem(item: T): boolean {
        const index = this.new.findIndex(currentItem =>
            this.compareItems(currentItem, item),
        );

        if (index === -1) {
            return false;
        }

        return true;
    }

    private isRemovedItem(item: T): boolean {
        const index = this.removed.findIndex(currentItem =>
            this.compareItems(currentItem, item),
        );

        if (index === -1) {
            return false;
        }

        return true;
    }

    private wasAddedInitially(item: T): boolean {
        const index = this.initial.findIndex(currentItem =>
            this.compareItems(currentItem, item),
        );

        if (index === -1) {
            return false;
        }

        return true;
    }

    // Private Commands

    private removeFromNew(item: T): void {
        this.new = this.new.filter(
            currentItem => !this.compareItems(currentItem, item),
        );
    }

    private removeFromCurrent(item: T): void {
        this.currentItems = this.currentItems.filter(
            currentItem => !this.compareItems(currentItem, item),
        );
    }

    private removeFromRemoved(item: T): void {
        this.removed = this.removed.filter(
            currentItem => !this.compareItems(currentItem, item),
        );
    }
}
