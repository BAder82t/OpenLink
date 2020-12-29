using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenLink.Models.Login
{
    public class ProfileModel
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Guid ID { get; set; }

        public static implicit operator ValueTask<object>(ProfileModel v)
        {
            throw new NotImplementedException();
        }
    }
}
