using System;

namespace ERP.API.Models
{
    public class OrderItem
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int Quantity { get; set; }
        public double UnitCost { get; set; }
        public double TotalCost { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}