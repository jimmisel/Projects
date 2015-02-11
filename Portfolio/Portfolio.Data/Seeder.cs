using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Portfolio.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio.Data
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

            if (!roleManager.RoleExists("Admin"))
            {
                var result = roleManager.Create(new Role
                {
                    Name = "Admin"
                });
            }



            ApplicationUser jim = userManager.FindByName("jimmisel@yahoo.com");

            if (jim == null)
            {
                jim = new ApplicationUser
                {
                    Email = "jimmisel@yahoo.com",
                    UserName = "jimmisel@yahoo.com",
                    DisplayName = "Jmisel"
                };

                userManager.Create(jim, "123456");
                userManager.AddToRole(jim.Id, "Admin");

                jim = userManager.FindByName("jimmisel@yahoo.com");
            }

            ApplicationUser j2 = userManager.FindByName("j@yahoo.com");

            if (j2 == null)
            {
                j2 = new ApplicationUser
                {
                    Email = "j@yahoo.com",
                    UserName = "j@yahoo.com",
                    DisplayName = "BigJim"

                };

                userManager.Create(j2, "123456");
                userManager.AddToRole(j2.Id, "General");

                j2 = userManager.FindByName("j@yahoo.com");
            }



        }


    }
}
