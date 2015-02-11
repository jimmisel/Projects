using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PetAdoption1_5_15.Models
{
    public class PetsIndexView
    {
        public List<Pet> Pets {get; set;}
    }
        public abstract class Pet
        {
            public int PetId { get; set; }
            public string Name { get; set; }
            public string Colors { get; set; }
            public int Age { get; set; }
            public PetType Type { get; set; }
        }
        public class Dog :Pet
        {
            public string Breed { get; set; }
            public string Size { get; set; }
            public  Dog()
            {
                Type = PetType.Dog;
            }
        }
        public class Cat :Pet
        {
            public string Hair { get; set; }
            public Cat()
            {
                Type = PetType.Cat;
            }
        }
        public class Bird :Pet
        {
            public string KindOfBird { get; set; }
            public Bird()
            {
                Type = PetType.Bird;
            }
        }
        public class Other :Pet
        {
            public string TypeOfOther { get; set; }

            public Other()
            {
                Type = PetType.Other;
            }
        }
        public enum PetType
        {
            Dog,
            Cat,
            Bird,
            Other
        }
    }
