import { InventoryItem } from "./InventoryItem";

interface InventoryProps<ID> {
    items: InventoryItem<ID>[],
}

export class Inventory<ID> {
    protected readonly _id: ID;
    public readonly props: InventoryProps<ID>;

    constructor(props: InventoryProps<ID>, id?: ID) {
        this._id = id;
        this.props = props;
    }
}