using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.API.Models
{
    public class DebitAccount
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int AccountId { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
    }
}