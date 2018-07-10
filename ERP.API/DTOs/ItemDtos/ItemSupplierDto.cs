using System;

namespace ERP.API.DTOs.ItemDtos
{
    public class ItemSupplierDto
    {
        public string SupplierName { get; set; }
        public double UnitCost { get; set; }
        public int LeadTime { get; set; }

        public bool IsPrimary { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}