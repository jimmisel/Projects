using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _1._7._2015PeopleEF.Models
{
    public class peopleViewModel
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
    }
    public class PeopleIndexViewModel
    {
        public List<peopleViewModel> persons { get; set; }
    }
}