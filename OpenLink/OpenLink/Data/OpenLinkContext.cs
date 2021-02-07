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

        public DbSet<Account> Account { get; set; }

        public DbSet<ProfileModel> ProfileModel { get; set; }
        public DbSet<APIModel> APIModels { get; set; }
        public DbSet<Link> Links { get; set; }
        public object HttpContext { get; internal set; }
    }
}
