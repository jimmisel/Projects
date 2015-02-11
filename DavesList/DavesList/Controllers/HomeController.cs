using DavesList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//DavesList wire frames
// Description: 
//Create Craigslist like website. At the home page the user can view the title of all products for our website.
//STRETCH GOAL:
//Each product should include a View Description link. The view description link should display the description of that specific product on its own View.
//Steps:
//-Create a Wireframe for all the views.
//-Create a Product class. The Product class must contain an id, title and description property.
//-Create the index page that shows all of the products
//Stretch
//-Create a  2 Views. One to display all products and one to display the description of the product.



namespace DavesList.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var product = new List<Product>()
            {
                new Product(){ Description = "This iis just a test to make sure that I am getting data", Id=1, Title="Testing"},
                new Product(){ Description = "This is the 2nd test. I have a few other things i want to do to this", Id=2, Title="Test 2"}
            };
            return View(product);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Form lesson 12/31/14";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Create()
        {

            return View();
        }

        [HttpPost]
        public ActionResult Create(CreateListing model)
        {

            return View();
        }

    }
}