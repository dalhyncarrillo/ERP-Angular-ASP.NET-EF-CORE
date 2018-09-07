using System;
using System.ComponentModel.DataAnnotations;

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
        [Timestamp]  
        public byte[] Timestamp { get; set; }  
    }
}