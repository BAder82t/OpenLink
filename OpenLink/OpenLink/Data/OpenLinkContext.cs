using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OpenLink.Models;
using OpenLink.Models.Login;

namespace OpenLink.Data
{
    public class OpenLinkContext : DbContext
    {
        public OpenLinkContext (DbContextOptions<OpenLinkContext> options)
            : base(options)
        {
        }

        public DbSet<OpenLink.Models.Account> Account { get; set; }

        public DbSet<OpenLink.Models.Login.ProfileModel> ProfileModel { get; set; }

   
    }
}
