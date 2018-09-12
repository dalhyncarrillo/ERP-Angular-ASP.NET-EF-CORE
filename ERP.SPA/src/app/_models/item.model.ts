export interface Item {

    itemId: number;
    name: string;
    status: string;
    retailPrice: number;
    avgCost: number;
    unitCost: number;
    quantityOnHand: number;
    quantityOrdered: number;
    timestamp?;
}
