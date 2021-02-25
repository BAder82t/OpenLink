using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models.Comments
{
    public class GetReplyModel
    {
        public Guid APIID { get; set; }
        public Guid CommentID {get;set;}
    }
}
