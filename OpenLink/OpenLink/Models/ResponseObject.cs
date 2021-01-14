using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models
{
    public class ResponseObject
    {
        public Object ValidObject { get; set; }
        public Object InvalidObject { get; set; }

        public ResponseObject(Object o, Boolean b)
        {
            if (b)
            {
                ValidObject = o;
            }
            else
            {
                InvalidObject = o;
            }
        }
    }
}
