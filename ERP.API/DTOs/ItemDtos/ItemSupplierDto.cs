using System;

namespace ERP.API.DTOs.ItemDtos
{
    public class ItemSupplierDto
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public double UnitCost { get; set; }
        public int LeadTime { get; set; }

        public bool IsPrimary { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}