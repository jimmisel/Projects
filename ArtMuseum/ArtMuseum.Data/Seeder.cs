using ArtMuseum.Data.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtMuseum.Data
{
    public static class Seeder
    {
        public static void Seed(ApplicationDbContext db)
        {
            UserStore<ApplicationUser> userStore = new UserStore<ApplicationUser>(db);
            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(userStore);
            RoleStore<Role> roleStore = new RoleStore<Role>(db);
            RoleManager<Role> roleManager = new RoleManager<Role>(roleStore);





            if (!roleManager.RoleExists("General"))
            {
                var result = roleManager.Create(new Role
                {
                    Name = "General"
                });


            }
            if (!roleManager.RoleExists("Artist"))
            {
                var result = roleManager.Create(new Role
                {
                    Name = "Artist"
                });


            }

            if (!roleManager.RoleExists("Admin"))
            {
                roleManager.Create(new Role
                {
                    Name = "Admin"
                });
            }



            ApplicationUser jim = new ApplicationUser
            {
                Email = "jimmisel@yahoo.com",
                UserName = "jimmisel@yahoo.com"
            };
            ApplicationUser zack = new ApplicationUser
            {
                Email = "zack@yahoo.com",
                UserName = "zack@yahoo.com"
            };
            ApplicationUser dom = new ApplicationUser
            {
                Email = "dom@yahoo.com",
                UserName = "dom@yahoo.com"
            };
            ApplicationUser logan = new ApplicationUser
            {
                Email = "logan@yahoo.com",
                UserName = "logan@yahoo.com"
            };
            ApplicationUser hailee = new ApplicationUser
            {
                Email = "hailee@email.com",
                UserName = "hailee@email.com"
            };

            userManager.Create(jim, "123456");
            ApplicationUser jim2 = userManager.FindByName("jimmisel@yahoo.com");
            userManager.AddToRole(jim2.Id, "Admin");

            userManager.Create(hailee, "123456");
            ApplicationUser hailee12 = userManager.FindByName("hailee@email.com");
            userManager.AddToRole(hailee12.Id, "General");

            userManager.Create(zack, "123456");
            ApplicationUser zack2 = userManager.FindByName("zack@yahoo.com");
            userManager.AddToRole(zack2.Id, "Artist");

            userManager.Create(dom, "123456");
            ApplicationUser dom2 = userManager.FindByName("dom@yahoo.com");
            userManager.AddToRole(dom2.Id, "Artist");

            userManager.Create(logan, "123456");
            ApplicationUser logan2 = userManager.FindByName("logan@yahoo.com");
            userManager.AddToRole(logan2.Id, "Artist");
        }
    }
}
