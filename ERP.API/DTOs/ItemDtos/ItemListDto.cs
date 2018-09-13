namespace ERP.API.DTOs.ItemDtos
{
    public class ItemListDto
    {
        public int ItemId { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public double RetailPrice { get; set; }
        public int QuantityOnHand { get; set; }
    }
}