import { InventoryItem } from "./InventoryItem";

interface TotalProps<ID> {
    items: InventoryItem<ID>[]
}

export class Total<ID> {
    public readonly props: TotalProps<ID>;

    constructor(props: TotalProps<ID>) {
        this.props = props;
    }
}