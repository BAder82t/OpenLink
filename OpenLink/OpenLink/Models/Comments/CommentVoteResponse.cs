using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models
{
    public class CommentVoteResponse
    {
        public Guid CommentID { get; set; }
        public Boolean Response { get; set; }
    }
}
