using ArtMuseum.Data;
using ArtMuseum.Data.Models;
using ArtMuseum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Migrations;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

namespace ArtMuseum.Adapters
{
    public class ArtWorkDataAdapter : IArtWork
    {
        
        public List<ArtViewModel> GetArtWorks(string Id)
        {
            //this gets the work for the list to show on the artist page
            List<ArtViewModel> model = null;
            

            using(ApplicationDbContext db = new ApplicationDbContext())
            {
                model = db.Art.Where(u => u.UserId == Id).Select(a => new ArtViewModel { 
                ArtWorkId = a.ArtWorkId,
                Description = a.Description,
                Img = a.Img,
                UserName = a.UserName
                
                }).ToList();
            };

            return model;

        }


        public List<ArtistViewModel> GetArtist()
        {
           
            //this will pull all users and set the role to true or false depening on if they are an artist or not
            //it will also set a true or fale for is the admin
            //why cant i use User in here ahhh wth
          //  ArtistView model = new ArtistView();
            List<ArtistViewModel> model = null;
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
                var q = db.Users.Select(a => new
                {
                    RoleName = db.Roles.Where(r => a.Roles.Select(a2 => a2.RoleId).Contains(r.Id)).FirstOrDefault().Name,
                    User = a
                });
               model = q.Select(a => new ArtistViewModel
                {
                    UserId = a.User.Id,
                    UserName = a.User.UserName,
                 IsArtist = a.RoleName == "Artist",
                 IsAdmin = a.RoleName =="Admin"
                }).ToList();
                
            }
            return model;
        }


        public ArtViewModel GetOneArtWork(int id)
        {
            ArtViewModel model = new ArtViewModel();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var Art = db.Art.FirstOrDefault(a => a.ArtWorkId == id);
                model.ArtTitle = Art.ArtTitle;
                model.Description = Art.Description;
                model.Img = Art.Img;
                model.UserId = Art.UserId;
                model.UserName = Art.UserName;
            };

            return model;
        }


        public ArtViewModel AddArt(ArtViewModel model)
        {
            using(ApplicationDbContext db = new ApplicationDbContext())
            {
                //db.Art.Add(new ArtViewModel
                //{
                //    ArtTitle = model.ArtTitle,
                //    Description = model.Description,
                //    Img = model.Img,
                //    UserId = model.UserId,
                //    UserName = model.UserName
                //});

                //db.SaveChanges();
            }
            return null;
            
        }
    }
}