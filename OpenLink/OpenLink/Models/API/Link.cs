using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models
{
    public class Link
    {
        public Guid ID { get; set; }
        [Required]
        public string URL { get; set; }
        [Required]
        public string InputData { get; set; }
        [Required]
        public string OutputData { get; set; }
        public string Description { get; set; }
        [Required]
        public string Method { get; set; }

    }
}
