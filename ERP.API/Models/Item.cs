using System;

namespace ERP.API.Models
{
    public class Item
    {
        public int ItemId { get; set; }
        public string Name { get; set; }
        public double RetailPrice { get; set; }
        public double AvgCost { get; set; }
        public int QuantityOnHand { get; set; }
        public int QuantityOrdered { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}