using Portfolio.Data;
using Portfolio.Data.Models;
using Portfolio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity.Migrations;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Portfolio.Adapter.Interface;
using Portfolio.Adapter.DataAdapter;

namespace Portfolio.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
          private IPortfolioAdapter _portAdapter;
        public AdminController()
        {
            _portAdapter = new PortfolioDataAdapter();

        }

        public AdminController(IPortfolioAdapter portAdapter)
        {
            _portAdapter = portAdapter;
        }
        // GET: Admin
        public ActionResult Index()
        {
            HomeIndexViewModels model = _portAdapter.AdminIndexProjectToShow();

            return View(model);
        }
        public ActionResult CreateBlog()
        {
            HomeViewModels model = new HomeViewModels();

            return View(model);
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult CreateBlog(HomeViewModels model)
        {
           
            //send the userid into the adapter as a param its the easy way to do this
           string result = _portAdapter.CreateProject(model,User.Identity.GetUserId() );

            return RedirectToAction("Index");
        }
        public ActionResult EditPost(int id)
        {
            HomeViewModels model = _portAdapter.EditProject(id);
            return View(model);
        }
        [HttpPost]
        public ActionResult EditPost(HomeViewModels model)
        {
            string result = _portAdapter.EditProject(model);

            return RedirectToAction("Index");
        }    
        [HttpPost]
        public ActionResult Delete(HomeViewModels model)
        {
            string result = _portAdapter.DeleteProject(model);

            return RedirectToAction("Index");
        }
        public ActionResult ShowUsers()
        {
           //will get to this at anothe time. not needed this very moment
            return View();
        }
        public ActionResult FrontPage()
        {
            //db issues will come back to it at a later time. this will be simple i just dont want to lose all my db info yet
            //decieded to not do this right now. maybe later
            return View();
        }

    }
}