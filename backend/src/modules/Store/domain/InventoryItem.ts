export interface PriceProps {
    gold: number,
    dollars: number|undefined
}

export interface InventoryItemProps<ID> {
    item_id: ID;
    price: PriceProps
}

export class InventoryItem<ID> {
    protected readonly _id: ID;
    public readonly props: InventoryItemProps<ID>;

    constructor(props: InventoryItemProps<ID>, id?: ID) {
        this._id = id;
        this.props = props;
    }

    get itemId(): ID {
        return this._id;
    }

    get goldPrice(): number {
        return this.props.price.gold;
    }

    get dollarPrice(): number|undefined {
        return this.props.price.dollars;
    }

    public equals(item?: InventoryItem<ID>): boolean {
        if(item == null || item == undefined) {
            return false;
        }

        if(this === item) {
            return true;
        }

        return this._id === item._id;
    }
}