using System;

namespace ERP.API.Models
{
    public class Inventory
    {
        public int InventoryId { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public double AvgCost { get; set; }
        public double UnitCost { get; set; }
        public int QuantityOnHand { get; set; }
        public int QuantityOrdered { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}