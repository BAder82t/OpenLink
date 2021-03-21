using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models.Bookmarks
{
    public class BookmarkedModel
    {
        public Guid ID { get; set; }
        public Guid UserID {get;set;}
        public Guid APIID { get; set; }

    }
}
