using JediDay3CSharp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;



//StarWars Jedi BountyHunters
//-Create an Abstract Character class that holds the following properties: Name, Race, and Type (Use an Enum to specify if it is a Jedi or a Bounty Hunter).
//-Create a Jedi Class which inherits from Character, and introduces a property of LightSaberColor.
//-Create a BountyHunter Class which inherits from Character, and introduces a property of WeaponType.
//-On the Index view, use Polymorphism to make a list of type Character that holds all Jedi and BountyHunters.
//-Create a Jedi view that uses LINQ to filter the Character List to only show the Jedi. Type cast the filtered list back to Jedi to allow you to see the LightSaberColor property
//-Create a BountyHunter view that uses LINQ to filter the Character List to only show the Bounty Hunters. Type cast the filterest list back to Jedi to allow you to see the WeaponType property.




namespace JediDay3CSharp.Controllers
{

    public class HomeController : Controller
    {
        ShowChars _model;
        public HomeController()
        {
            _model = PopChar();       
        }
        public ActionResult Index()
        {
            

            return View(_model);
        }

        private static ShowChars PopChar()
        {
            ShowChars model = new ShowChars();
            model.Characters = new List<Character>
            {
                new Jedi{LightSaberColor = "Blue", Name = "Jim", Race ="Weird thing"},
                new Jedi{ LightSaberColor = "Red", Name = "Joe", Race= "Human"},
                new BountyHunter{ Name = "Guy", Race = "Wookie", WeponType="Gun"},
                new BountyHunter{Name = "boba", Race="lizard thing", WeponType="venom spit"}
            };
            return model;
        }

        public ActionResult Jedi()
        {

            

            return View(_model);

            
        }
        public ActionResult BountyHunter()
        {
           

            return View(_model);

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