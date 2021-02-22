using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models
{
    public class ObjectListModel
    {
        public Object Obj { get; set; }
        public IEnumerable<Object> List { get; set; }
    }
}
