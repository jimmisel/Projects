using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Portfolio.Models
{
    public class PostViewModels
    {
        public int PostId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public DateTime DatePosted { get; set; }
       
        public string Title { get; set; }
        [AllowHtml]
        public string Body { get; set; }
        [Display(Name = "Delete")]
        public bool IsDeleted { get; set; }
        public int AnswerCount { get; set; }
        public int PostCount { get; set; }
        public int PostViews { get; set; }
    }
    public class UserDisplayInfo
    {
        public string UserId { get; set; }
        public string DisplayName { get; set; }
    }
    public class SubPostViewModels
    {
        public int SubPostId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int PostId { get; set; }
        public DateTime DatePosted { get; set; }
        public string Title { get; set; }
        [AllowHtml]
        public string Body { get; set; }
        [Display(Name = "Delete")]
        public bool IsDeleted { get; set; }
        public string DisplayName { get; set; }
        public List<PostViewModels> Post { get; set; }
       
    }
    public class SubscribeViewModels
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        [Display(Name = "Delete")]
        public bool IsDeleted { get; set; }
        
    }
    public class ForumIndexViewModels
    {
        public int PostCount { get; set; }
        public List<PostViewModels> Posts { get; set; }
        public List<SubPostViewModels> SubPosts { get; set; }
        public List<SubscribeViewModels> Subscribers { get; set; }
        public SubPostViewModels subPosts { get; set; }
    }
    public class NewSubPostViewModels
    {
        public int SubPostId { get; set; }
        public string UserId { get; set; }
        public int PostId { get; set; }
        public DateTime DatePosted { get; set; }
        public string Title { get; set; }
        [AllowHtml]
        public string Body { get; set; }
        [Display(Name = "Delete")]
        public bool IsDeleted { get; set; }
        public string DisplayName { get; set; }
        public int PostViews { get; set; }
        public List<PostViewModels> Post { get; set; }
        public List<SubPostViewModels> SubPosts { get; set; }
        public SubscribeViewModels Subscriber { get; set; }
        public List<SubscribeViewModels> Subscribers { get; set; }
        public int SubScribeId { get; set; }
    }
}