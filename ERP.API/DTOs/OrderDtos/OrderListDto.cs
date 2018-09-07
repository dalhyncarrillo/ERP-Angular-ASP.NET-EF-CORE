using System;
using System.ComponentModel.DataAnnotations;

namespace ERP.API.DTOs.OrderDtos
{
    public class OrderListDto
    {
        
        public int OrderId { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string Status { get; set; }
        public double TotalCost { get; set; }
        public DateTime RequestedDate { get; set; }
    }
}