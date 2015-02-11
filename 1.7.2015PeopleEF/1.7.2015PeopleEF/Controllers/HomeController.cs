using _1._7._2015PeopleEF.Models;
using _1._7._2015PeopleEf.Data;
using _1._7._2015PeopleEf.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace _1._7._2015PeopleEF.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //build the list here to show your people
            PeopleIndexViewModel model = new PeopleIndexViewModel();

            using(PeopleData db = new PeopleData())
            {
                model.persons = db.people.Select(p => new peopleViewModel 
                { 
                PersonId = p.PeopleId,
                FirstName = p.FirstName,
                LastName = p.LastName
                }).ToList();
            }



            return View(model);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}