using PetAdoption1_5_15.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PetAdoption1_5_15.Controllers
{
   
    public class HomeController : Controller
    {
        private PetServices _services;
         public  HomeController()
    {
        _services = PetServices.Instance;
    }


        public ActionResult Index()
        {
            PetsIndexView model = new PetsIndexView();
            model.Pets = _services.GetPets();
            return View(model);
        }
        public ActionResult Dog()
        {
            PetsIndexView model = new PetsIndexView();
            model.Pets = _services.GetPets();
            return View(model);
        }
        public ActionResult Cat()
        {
            PetsIndexView model = new PetsIndexView();
            model.Pets = _services.GetPets();
            return View(model);
        }
        public ActionResult Birds()
        {
            PetsIndexView model = new PetsIndexView();
            model.Pets = _services.GetPets();
            return View(model);
        }
        public ActionResult Other()
        {
            PetsIndexView model = new PetsIndexView();
            model.Pets = _services.GetPets();
            return View(model);
        }
 
    }
}