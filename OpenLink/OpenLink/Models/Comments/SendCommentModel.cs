using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models.Login
{
    public class SendCommentModel
    {
        [Required]
        public string Message { get; set; }
        [Required]
        public Guid APIID { get; set; }
        public Guid ReplyID { get; set; }
    }
}
