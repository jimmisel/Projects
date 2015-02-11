using CSharpDay2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CSharpDay2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var homes = new List<Homes>()
            {
                new Homes(){Id=1, Address = "232 some st some state", BedRooms = "5"}
            };
            return View(homes);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

           var persons = new List<Person>()
            {
                new Person(){ Id = 1, Email = "b@web.com", Name = "Bob"},
                new Person(){ Id = 2, Email = "j@web.com", Name = "Jim"},
                new Person(){ Id = 3, Email = "Y@web.com", Name = "you"}
            };


            return View(persons);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            var cars = new List<Car>()
            {
                new Car(){Id = 1, Make = "Chevy", Year = "2012"},
                new Car(){Id = 2, Make = "Ford", Year = "2002"}
            };
            return View(cars);
        }
    }
}