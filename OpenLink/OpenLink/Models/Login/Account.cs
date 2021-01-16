using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models
{
    public class Account
    {

        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }

        public Guid RegisterID { get; set; }
    }
}
