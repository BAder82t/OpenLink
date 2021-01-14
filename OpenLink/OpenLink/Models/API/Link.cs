using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models
{
    public class Link
    {
        public Guid ID { get; set; }
        public string URL { get; set; }
        public string InputData { get; set; }
        public string OutputData { get; set; }
        public string Description { get; set; }
        public Guid APIID { get; set; }

    }
}
