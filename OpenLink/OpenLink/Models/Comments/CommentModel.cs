using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models.API
{
    public class CommentModel
    {
        public Guid ID { get; set; }
        public Guid APIID { get; set; }
        public Guid UserID { get; set; }
        public string Name { get; set; }
        public Guid ReplyID { get; set; }
        public int ReplyNum { get; set; }
        public string Messege { get; set; }
        public int Vote { get; set; }
        public int DidVote { get; set; }//0 no vote; 1 agree; 2 disagree
        public string Date { get; set; }
        public DateTime RealDate { get; set; }
        public List<CommentModel> Replies { get; set; }

    }
}
