using Portfolio.Adapter.DataAdapter;
using Portfolio.Adapter.Interface;
using Portfolio.Data;
using Portfolio.Data.Models;
using Portfolio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Portfolio.Controllers
{
    public class HomeController : Controller
    {

        private IPortfolioAdapter _portAdapter;
        public HomeController()
        {
            _portAdapter = new PortfolioDataAdapter();

        }

        public HomeController(IPortfolioAdapter portAdapter)
        {
            _portAdapter = portAdapter;
        }


        //start the adapter in this file as it will be the easy one to convert 
        //just pulling info to show no need to get the logged in user info
        public ActionResult Index()
        {
            var model = _portAdapter.IndexProjectToShow();

            return View(model);
        }
        public ActionResult Projects()
        {
            HomeIndexViewModels model = _portAdapter.ProjectToShow();

            return View(model);
        }
        public ActionResult ViewPost(int id)
        {

            HomeIndexViewModels model = _portAdapter.SingleProject(id);

            return View(model);
        }
        public ActionResult MyBlog()
        {
            //this page makes an ajax call to my blogs rss feed. no code to add in here
            return View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            //page not used
            return View();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            //page not used
            return View();
        }
    }
}