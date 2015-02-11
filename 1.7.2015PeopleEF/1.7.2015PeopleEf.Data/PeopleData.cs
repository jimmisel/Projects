using _1._7._2015PeopleEf.DataModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _1._7._2015PeopleEf.Data
{
    public class PeopleData : DbContext
    {
        public  PeopleData() : base("DefaultConnection")
        {

        }

       public DbSet<People> people { get; set; }


    }
}
