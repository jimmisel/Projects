using Microsoft.AspNet.Identity.EntityFramework;
using Portfolio.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }




        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<SubPost> SubPosts { get; set; }
        public DbSet<Subscribe> Subscribers { get; set; }
        public DbSet<FrontPage> FrontPageShow { get; set; }

    }
}
