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
using Portfolio.Adapter.Interface;
using Portfolio.Adapter.DataAdapter;
namespace Portfolio.Controllers
{
    public class ForumController : Controller
    {
         private IPortfolioAdapter _portAdapter;
        public ForumController()
        {
            _portAdapter = new PortfolioDataAdapter();

        }

        public ForumController(IPortfolioAdapter portAdapter)
        {
            _portAdapter = portAdapter;
        }
        string _username;
        string _email;
        string _poster;
        // GET: Forum
        public ActionResult Index()
        {
            ForumIndexViewModels model = _portAdapter.AllPostIndex();
            
            return View(model);
        }
        public ActionResult SingleView(int id)
        {
            NewSubPostViewModels model = _portAdapter.ForumSinglePost(id);
            return View(model);
        }
        //adds the subpost here also email the subscribers
        [Authorize]
        [HttpPost]
        public ActionResult SingleView(NewSubPostViewModels model)
        {
            var result = _portAdapter.ForumSinglePost(model, User.Identity.GetUserId());

           
            return RedirectToAction("SingleView/" + model.PostId);  
        }
        [Authorize]
        public ActionResult DeleteSubPost(int id)
        {
            string result = _portAdapter.DeleteSubPost(id);

            return RedirectToAction("index");
        }
        [Authorize]
        public ActionResult DeletePost(int id)
        {
            string result = _portAdapter.DeletePost(id);
            return RedirectToAction("index");
        }
        [Authorize]
        public ActionResult NewPost()
        {
            PostViewModels model = new PostViewModels();

           
            return View(model);
        }
        [Authorize]
        [HttpPost]
        public ActionResult NewPost(PostViewModels model)
        {
            var result = _portAdapter.CreatePost(model, User.Identity.GetUserId());
            return RedirectToAction("Index");
        }
        [Authorize]
        public ActionResult EditPost(int id)
        {
            PostViewModels model = _portAdapter.EditPost(id, User.Identity.GetUserId(), User.IsInRole("Admin"));
            return View(model);
        }
        [Authorize]
        [HttpPost]
        public ActionResult EditPost(PostViewModels model)
        {
            var result = _portAdapter.EditPost(model);

            if (model.IsDeleted == true)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return RedirectToAction("SingleView/" + model.PostId);
            }
        }
        [Authorize]
        public ActionResult Subscribe(NewSubPostViewModels sub)
        {
            //need to pull the post id and the user id to save to the table so i can set them up to have emails sent to them
            var result = _portAdapter.Subscribe(sub, User.Identity.GetUserId());
        
            return RedirectToAction("SingleView/" + sub.PostId);

        }
        [Authorize]
        public ActionResult UnSubscribe(NewSubPostViewModels sub)
        {
            var result = _portAdapter.UnSubscribe(sub);
          
            return RedirectToAction("SingleView/" + sub.PostId);
        }
        public ActionResult EditSubPost(int id)
        {
            SubPostViewModels model = _portAdapter.EditSubPost(id);
            return View(model);
        }
        [Authorize]
        [HttpPost]
        public ActionResult EditSubPost(SubPostViewModels model)
        {
            var result = _portAdapter.EditSubPost(model);

            return RedirectToAction("SingleView/" + model.PostId);
        }
    }
}