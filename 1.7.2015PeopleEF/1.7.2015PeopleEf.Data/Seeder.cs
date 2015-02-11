using _1._7._2015PeopleEf.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Migrations;

namespace _1._7._2015PeopleEf.Data
{
    public static class Seeder
    {
        public static void Seed(PeopleData context)
        {
            People people = new People()
            {
                FirstName = "Jim",
                LastName = "Misel"
            };
            People people2 = new People()
            {
                FirstName ="Hailee",
                LastName = "Misel"
            };
            People people3 = new People()
            {
                FirstName = "Zachary",
                LastName = "Misel"
            };

            context.people.AddOrUpdate(p => p.FirstName, people, people2, people3);
            context.SaveChanges();


        }
   
    }
}
