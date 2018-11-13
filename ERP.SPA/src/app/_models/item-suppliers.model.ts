export interface ItemSuppliers {
    itemId: number;
    itemName: string;
    supplierId: number;
    supplierName: string;
    unitCost: number;
    leadTime: number;
    isPrimary: boolean;
    timestamp?;
}
