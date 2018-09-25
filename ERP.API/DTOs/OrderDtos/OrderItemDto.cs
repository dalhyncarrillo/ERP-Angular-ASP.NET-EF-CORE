namespace ERP.API.DTOs.OrderDtos
{
    public class OrderItemDto
    {
        public int OrderId { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public double UnitCost { get; set; }
        public double TotalCost { get; set; }
        public byte[] Timestamp { get; set; }  
    }
}