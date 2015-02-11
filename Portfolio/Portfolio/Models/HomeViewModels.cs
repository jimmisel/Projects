using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Portfolio.Models
{
    //should add user info in here also and just use the one set of models for both the front end and the admin section
    public class HomeViewModels
    {
        public int BlogId { get; set; }
        public DateTime DatePosted { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        [AllowHtml]
        public string Body { get; set; }
        public string ImgUrl { get; set; }
        public bool IsDeleted { get; set; }
        public string UserDisplayName { get; set; }
    }

    public class HomeIndexViewModels
    {
        public List<HomeViewModels> BlogPost { get; set; }
    }
}