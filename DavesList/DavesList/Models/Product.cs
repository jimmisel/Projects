using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DavesList.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
    public class CreateListing
    {
        public string Text { get; set; }
    }

}

