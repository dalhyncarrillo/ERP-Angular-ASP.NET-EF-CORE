import { Item } from "./item.model";

export interface OrderItems {
    orderId: number;
    itemId: number;
    unitCost: number;
    quantity: number;
    totalCost: number;
}
