using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models.API
{
    public class GetCommentsModel
    {
        [Required]
        public Guid APIID { get; set; }
    }
}
