using System;

namespace ERP.API.Models
{
    public class Item
    {
        public int ItemId { get; set; }
        public string Name { get; set; }
        public double RetailPrice { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}