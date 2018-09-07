using System;
using System.ComponentModel.DataAnnotations;

namespace ERP.API.Models
{
    public class GeneralLedger
    {
        [Key]
        public int TransactionId { get; set; }
        public DateTime Occured { get; set; }
        public string Description { get; set; }
        public int CreditAccountId { get; set; }        
        public CreditAccount CreditAccount {get; set; }
        public int DebitAccountId { get; set; }
        public DebitAccount DebitAccount { get; set; }
        public double Amount { get; set; }
        
    }
}