using RestReview1._2._15PairedTask.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

//Restaurant Review:
//-Create a Restaurant review page. On the Index view show a list of all Restaurants.
//-When you click on a restaurant take the user to a details page where they see the Cuisine, and a rating. Also show a picture of the restaurant logo.
//-Full CRUD 
//-Add ability to add user ratings to the page, then make the rating shown on the details page the average of all ratings. 


namespace RestReview1._2._15PairedTask.Controllers
{
    public class HomeController : Controller
    {
        private ReviewServices _service;
        public HomeController()
        {
            _service = ReviewServices.Instance;
        }
        public ActionResult Index()
        {
            RestReviewIndexViewModel model = new RestReviewIndexViewModel();
            model.Reviews = _service.GetReviews();

            return View(model);
        }

        public ActionResult Create()
        {
            CreateReviewViewModel model = new CreateReviewViewModel();


            return View(model);
        }
        [HttpPost]
        public ActionResult Create(CreateReviewViewModel model)
        {
            int id = _service.CreateReview(model.Name, model.Text, model.Cuisine, model.Image, model.Rating);
            return RedirectToAction("Index");
            
        }
        public ActionResult Description(int id)
        {

            RestReviewView model = new RestReviewView();
            //DisplayReview model = new DisplayReview();
            model = _service.GetReview(id);

           

            return View(model);
        }
        public ActionResult Update()
        {
            return View();
        }



        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}