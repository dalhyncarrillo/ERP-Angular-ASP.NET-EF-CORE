using System;
using System.Collections.Generic;

namespace ERP.API.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public string Status { get; set; }
        public double TotalCost { get; set; }
        public DateTime RequestedDate { get; set; }
        public DateTime ReceivedDate { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}