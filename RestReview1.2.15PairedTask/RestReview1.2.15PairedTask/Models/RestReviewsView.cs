using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestReview1._2._15PairedTask.Models
{
    public class Comments
    {
        public string UserName { get; set; }
        public string UserComment { get; set; }
        public DateTime DateAdded { get; set; }

    }
    public class RestReviewView 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string Cuisine { get; set; }
        public string Image { get; set; }
        public float Rating { get; set; }
        public DateTime DateUpdated { get; set; }
        public List<Comments> Comment { get; set; }
       

    }
    public class RestReviewIndexViewModel
    {
        public List<RestReviewView> Reviews { get; set; }
    }

    public class CreateReviewViewModel
    {
        public string Name { get; set; }
        public string Text { get; set; }
        public string Cuisine { get; set; }
        public string Image { get; set; }
        public float Rating { get; set; }

    }
    public class UpdateReviewViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string Cuisine { get; set; }
        public string Image { get; set; }
        public float Rating { get; set; }
    }

  
}