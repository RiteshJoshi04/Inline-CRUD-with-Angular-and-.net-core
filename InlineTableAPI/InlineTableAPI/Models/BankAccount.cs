using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InlineTableAPI.Models
{
    public class BankAccount
    {
        [Key]
        public int BankAccountId { get; set; }
        [Required]
        [Column(TypeName ="varchar(30)")]
        public string AccountNumber { get; set; }
        [Required]
        [Column(TypeName = "varchar(100)")]
        public string AccountHolder { get; set; }
        [Required]
        [Column(TypeName = "varchar(20)")]
        public string IFSC { get; set; }
        [Required]
        public int BankId { get; set; }
    }
}
