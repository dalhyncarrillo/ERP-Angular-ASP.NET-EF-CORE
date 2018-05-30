using System;

namespace ERP.API.Models
{
    public class ItemSupplier
    {
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public double UnitCost { get; set; }
        public int LeadTime { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}