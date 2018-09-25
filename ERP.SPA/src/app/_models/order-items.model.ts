import { Item } from "./item.model";

export interface OrderItems {
    orderId: number;
    itemId: number;
    itemName: string;
    unitCost: number;
    quantity: number;
    totalCost: number;
    timestamp?;
}
