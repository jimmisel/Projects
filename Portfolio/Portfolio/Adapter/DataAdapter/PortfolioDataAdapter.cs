using Portfolio.Adapter.Interface;
using Portfolio.Data;
using Portfolio.Data.Models;
using Portfolio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Portfolio.Adapter.DataAdapter
{
    public class PortfolioDataAdapter : IPortfolioAdapter
    {
        //probrably not the best idea to put all of these in the same file but here goes nothing
        //home section
        public HomeIndexViewModels IndexProjectToShow()
        {
            HomeIndexViewModels model = new HomeIndexViewModels();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var count = db.Blogs.Where(b => b.IsDeleted == false).Count();
                model.BlogPost = db.Blogs.Where(b => b.IsDeleted == false).Select(b => new HomeViewModels
                {
                    BlogId = b.BlogId,
                    Body = b.Body,
                    DatePosted = b.DatePosted,
                    ImgUrl = b.ImgUrl,
                    IsDeleted = b.IsDeleted,
                    Title = b.Title,
                    UserId = b.User.DisplayName
                }).OrderByDescending(s => s.BlogId).Take(2).ToList();

            }
            return model;
        }
        public HomeIndexViewModels ProjectToShow()
        {
            HomeIndexViewModels model = new HomeIndexViewModels();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                model.BlogPost = db.Blogs.Select(b => new HomeViewModels
                {
                    BlogId = b.BlogId,
                    Body = b.Body,
                    DatePosted = b.DatePosted,
                    ImgUrl = b.ImgUrl,
                    IsDeleted = b.IsDeleted,
                    Title = b.Title,
                    UserId = b.User.DisplayName
                }).OrderByDescending(s => s.BlogId).ToList();

            }
            return model;
        }
        public HomeIndexViewModels SingleProject(int id)
        {
            HomeIndexViewModels model = new HomeIndexViewModels();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                model.BlogPost = db.Blogs.Where(b => b.BlogId == id).Select(bp => new HomeViewModels
                {
                    BlogId = bp.BlogId,
                    Body = bp.Body,
                    DatePosted = bp.DatePosted,
                    ImgUrl = bp.ImgUrl,
                    IsDeleted = bp.IsDeleted,
                    Title = bp.Title,
                    UserDisplayName = bp.User.DisplayName
                }).ToList();
            }
            return model;
        }

        //admin section
        public HomeIndexViewModels AdminIndexProjectToShow()
        {
            HomeIndexViewModels model = new HomeIndexViewModels();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                model.BlogPost = db.Blogs.Where(b => b.IsDeleted == false).Select(b => new HomeViewModels
                {
                    BlogId = b.BlogId,
                    Body = b.Body,
                    DatePosted = b.DatePosted,
                    ImgUrl = b.ImgUrl,
                    IsDeleted = b.IsDeleted,
                    Title = b.Title,
                    UserDisplayName = b.User.DisplayName
                }).ToList();

            }
            return model;
        }
        public string CreateProject(HomeViewModels model, string userId)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var added = db.Blogs.Add(new Blog
                {
                    Title = model.Title,
                    Body = model.Body,
                    DatePosted = DateTime.Now,
                    ImgUrl = model.ImgUrl,
                    UserId = userId
                });
                db.SaveChanges();
            }
            return "ok";
        }
        public string EditProject(HomeViewModels model)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var GetPost = db.Blogs.Find(model.BlogId);
                GetPost.Title = model.Title;
                GetPost.Body = model.Body;
                GetPost.ImgUrl = model.ImgUrl;
                if (model.IsDeleted == true)
                {
                    GetPost.IsDeleted = model.IsDeleted;
                }
                db.SaveChanges();
            }
            return "ok";
        }
        public HomeViewModels EditProject(int id)
        {
            HomeViewModels model = new HomeViewModels();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var GetPost = db.Blogs.FirstOrDefault(b => b.BlogId == id);
                model.BlogId = GetPost.BlogId;
                model.Body = GetPost.Body;
                model.ImgUrl = GetPost.ImgUrl;
                model.Title = GetPost.Title;
                model.IsDeleted = GetPost.IsDeleted;
            }
            return model;
        }
        public string DeleteProject(HomeViewModels model)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var GetPost = db.Blogs.Find(model.BlogId);
                GetPost.IsDeleted = true;
                db.SaveChanges();
            }
            return "ok";
        }



        // Fourm section 
        public ForumIndexViewModels AllPostIndex()
        {
            ForumIndexViewModels model = new ForumIndexViewModels();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                model.PostCount = db.Posts.Where(p => p.IsDeleted == false).Count();
                model.Posts = db.Posts.Where(p => p.IsDeleted == false).Select(p => new PostViewModels
                {
                    Body = p.Body,
                    DatePosted = p.DatePosted,
                    IsDeleted = p.IsDeleted,
                    PostId = p.PostId,
                    Title = p.Title,
                    UserId = p.UserId,
                    AnswerCount = db.SubPosts.Where(sb => sb.PostId == p.PostId && sb.IsDeleted == false).Count(),
                    DisplayName = p.User.DisplayName,
                    PostViews = p.PostViews,

                }).OrderByDescending(n => n.PostId).ToList();


            }
            return model;
        }

        public NewSubPostViewModels ForumSinglePost(int id)
        {
            NewSubPostViewModels model = new NewSubPostViewModels();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {

                var getPost = db.Posts.FirstOrDefault(p => p.PostId == id);
                getPost.PostViews++;
                db.SaveChanges();

                model.Post = db.Posts.Where(p => p.PostId == id).Select(sp => new PostViewModels
                {
                    Body = sp.Body,
                    DatePosted = sp.DatePosted,
                    DisplayName = sp.User.DisplayName,
                    IsDeleted = sp.IsDeleted,
                    Title = sp.Title,
                    PostId = sp.PostId,
                    UserId = sp.UserId,
                    UserName = sp.User.Email

                }).ToList();
                model.PostId = id;
                model.UserId = db.Posts.Find(id).UserId;

                model.SubPosts = db.SubPosts.Where(s => s.PostId == id && s.IsDeleted == false).Select(sp => new SubPostViewModels
                {
                    Body = sp.Body,
                    DatePosted = sp.DatePosted,
                    IsDeleted = sp.IsDeleted,
                    Title = sp.Title,
                    UserId = sp.UserId,
                    DisplayName = sp.User.DisplayName,
                    SubPostId = sp.SubPostId,
                    UserName = sp.User.Email
                }).OrderByDescending(l => l.SubPostId).ToList();
                model.Subscribers = db.Subscribers.Where(sb => sb.PostId == id).Select(sbs => new SubscribeViewModels
                {
                    IsDeleted = sbs.IsDeleted,
                    PostId = sbs.PostId,
                    UserId = sbs.UserId,
                    UserName = sbs.User.Email,
                    Id = sbs.Id,

                }).ToList();

            }
            return model;
        }

        public NewSubPostViewModels ForumSinglePost(NewSubPostViewModels model, string userId)
        {
            string _username;
            string _email;
            string _poster;
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var added = db.SubPosts.Add(new SubPost
                {
                    Body = model.Body,
                    DatePosted = DateTime.Now,
                    PostId = model.PostId,
                    UserId = userId,
                    Title = model.Title
                });
                model.Subscribers = db.Subscribers.Where(s => s.PostId == model.PostId).Select(sp => new SubscribeViewModels
                {
                    UserName = sp.User.Email,
                    UserId = sp.User.DisplayName
                }).ToList();

                // once this is added let the person who posted know someone responded to their Question
                db.SaveChanges();

                _poster = db.Users.Find(userId).DisplayName;

                if (model.Subscribers.Count == 0 || model.Subscribers == null)
                {

                }
                else
                {
                    //email only the subscribers
                    foreach (var m in model.Subscribers)
                    {
                        _email = m.UserName;
                        _username = m.UserId;

                        //add the email send here
                        EmailManager.SendEmailNewSubPost(_email, _username, _poster);
                    }


                }
                //email the person who made the post
                _email = db.Users.Find(model.UserId).Email;
                _username = db.Users.Find(model.UserId).DisplayName;

                //add the email send here
                EmailManager.SendEmailNewAnswer(_email, _username, _poster);
            }
            return model;
        }

        public string DeleteSubPost(int id)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var getSub = db.SubPosts.Find(id);
                getSub.IsDeleted = true;
                db.SaveChanges();
            }
            return "ok";
        }

        public string DeletePost(int id)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var getPost = db.Posts.Find(id);
                getPost.IsDeleted = true;
                db.SaveChanges();
            }
            return "ok";
        }

        public string CreatePost(PostViewModels model, string userId)
        {
            //add the new post to the db here


            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                //create the new post
                var added = db.Posts.Add(new Post
                {
                    Title = model.Title,
                    Body = model.Body,
                    DatePosted = DateTime.Now,
                    UserId = userId,
                    PostViews = 0
                });

                db.SaveChanges();

            }
            return "ok";

        }

        public PostViewModels EditPost(int id, string userId, bool role)
        {
            PostViewModels model = new PostViewModels();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                if (role)
                {
                    var GetPost = db.Posts.FirstOrDefault(p => p.PostId == id);
                    model.Body = GetPost.Body;
                    model.IsDeleted = GetPost.IsDeleted;
                    model.Title = GetPost.Title;
                    model.PostId = GetPost.PostId;
                }
                else
                {
                    var GetPost = db.Posts.Where(p => p.UserId == userId).FirstOrDefault(p => p.PostId == id);
                    model.Body = GetPost.Body;
                    model.IsDeleted = GetPost.IsDeleted;
                    model.Title = GetPost.Title;
                    model.PostId = GetPost.PostId;
                }
            }
            return model;
        }

        public string EditPost(PostViewModels model)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var GetPost = db.Posts.Find(model.PostId);
                GetPost.Body = model.Body;
                GetPost.Title = model.Title;
                GetPost.IsDeleted = model.IsDeleted;

                db.SaveChanges();

            }
            return "ok";
        }

        public string Subscribe(NewSubPostViewModels sub, string userId)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                if (sub.SubScribeId == 0)
                {
                    //add a new subscriber to that post
                    var getSub = db.Subscribers.Add(new Subscribe
                    {
                        PostId = sub.PostId,
                        UserId = userId
                    });

                }
                else
                {
                    //else it is already there and we just need to update it to show that they wanted to resubscribe
                    var getS = db.Subscribers.Find(sub.SubScribeId);
                    getS.IsDeleted = false;

                }


                db.SaveChanges();
            }
            return "ok";
        }

        public string UnSubscribe(NewSubPostViewModels sub)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var getSub = db.Subscribers.FirstOrDefault(s => s.Id == sub.SubScribeId);
                getSub.IsDeleted = true;
                db.SaveChanges();
            }
            return "ok";
        }

        public SubPostViewModels EditSubPost(int id)
        {
            SubPostViewModels model = new SubPostViewModels();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var getSub = db.SubPosts.Find(id);
                model.Body = getSub.Body;
                model.Title = getSub.Title;
                model.SubPostId = getSub.SubPostId;
                model.PostId = getSub.PostId;
            }
            return model;
        }

        public string EditSubPost(SubPostViewModels model)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                var getsub = db.SubPosts.Find(model.SubPostId);
                if (model.Title == null)
                {
                    getsub.Body = model.Body;
                }
                else
                {
                    getsub.Title = model.Title;
                    getsub.Body = model.Body;
                }
                db.SaveChanges();
            }
            return "ok";
        }
    }
}