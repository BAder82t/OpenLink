using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OpenLink.Models;

namespace OpenLink.Data
{
    public class OpenLinkContext : DbContext
    {
        public OpenLinkContext (DbContextOptions<OpenLinkContext> options)
            : base(options)
        {
        }

        public DbSet<OpenLink.Models.Account> Account { get; set; }
    }
}
