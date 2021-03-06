using System;

namespace ERP.API.DTOs.OrderDtos
{
    public class OrderDetailDto
    {
        public int OrderId { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string Status { get; set; }
        public double TotalCost { get; set; }
        public System.Nullable<int> ApprovedBy { get; set; }
        public int CreatedBy { get; set; }
        public DateTime RequestedDate { get; set; }
        public System.Nullable<DateTime> ReceivedDate { get; set; }
        public byte[] Timestamp { get; set; }  
    }
}