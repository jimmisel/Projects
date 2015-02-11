using RestReview1._2._15PairedTask.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestReview1._2._15PairedTask
{
    public class ReviewServices
    {
        private static ReviewServices _instance = null;
        public static ReviewServices Instance
        {
            get{
                if (_instance == null)
                {
                    _instance = new ReviewServices();
                    
                }
                return _instance;
            }
        }


        private List<RestReviewView> _reviews;
        private int _seedId;

        private ReviewServices()
        {
            _seedId = 1;
            _reviews = new List<RestReviewView>();
        }
        public List<RestReviewView> GetReviews()
        {
            return _reviews;
        }

        public RestReviewView GetReview(int id)
        {
            return _reviews.FirstOrDefault(r => r.Id == id);
        }

        public int CreateReview(string name, string text, string cuisine, string image,float rating)
        {
            RestReviewView model = new RestReviewView
            {
                 Id = _seedId,
                 Name = name,
                 Text = text,
                 Cuisine = cuisine,
                 Image = image,
                 Rating = rating,
                 DateUpdated = DateTime.Now
            };
            _reviews.Add(model);
            _seedId++;

               return model.Id;
        }
        public void UpdateReview(int id,string name, string text, string cuisine, string image,float rating )
        {
            RestReviewView model = _reviews.FirstOrDefault(r => r.Id == id);
                if (model == null)
                    return;
            model.Text = text;
            model.Name = name;
            model.Image = image;
            model.Cuisine = cuisine;
            model.Rating = rating;
            model.DateUpdated = DateTime.Now;
	
		 
	    }
      }

    }

