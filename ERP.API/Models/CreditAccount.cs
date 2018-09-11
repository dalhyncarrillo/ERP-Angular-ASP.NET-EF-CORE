using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.API.Models
{
    public class CreditAccount
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CreditAccountId { get; set; }
        public string NameEn { get; set; }
        public string NameHu { get; set; }
        public double Amount { get; set; }
    }
}