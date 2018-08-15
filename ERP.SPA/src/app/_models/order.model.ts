export interface Order {
    orderId: number;
    supplierId: number;
    supplierName: string;
    status: string;
    totalCost: number;
    approvedBy: number;
    createdBy: number;
    requestedDate: Date;
    receivedDate: Date;
}
