using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models
{
    public class AccountResult
    {
        public Boolean IsValid { get; set; }
        public String AccessToken { get; set; }
        public String RefreshToken { get; set; }

    }
}
