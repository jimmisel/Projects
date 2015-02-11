﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio.Data.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime DatePosted { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public bool IsDeleted { get; set; }
        
  [Required]
        public int PostViews { get; set; }
    }
}