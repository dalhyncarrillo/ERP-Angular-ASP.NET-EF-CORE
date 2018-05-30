using System;

namespace ERP.API.Models
{
    public class Supplier
    {
        public int SupplierId { get; set; }
        public string Name { get; set; }
        public string ContactName { get; set; }
        public  string PhoneNumber { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}