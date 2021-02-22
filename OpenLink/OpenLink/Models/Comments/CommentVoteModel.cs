using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models.API
{
    public class CommentVoteModel
    {
        public Guid ID { get; set; }
        public Guid APIID { get; set; }
        public Guid CommentID { get; set; }
        public Guid UserID { get; set; }
        public Boolean Response { get; set; }
    }
}
