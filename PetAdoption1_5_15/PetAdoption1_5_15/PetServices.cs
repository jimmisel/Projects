using PetAdoption1_5_15.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PetAdoption1_5_15
{
   

    public class PetServices
    {
      private static PetServices _instance = null;
      private List<Pet> _pets;
        //private int _seedId;
      public static PetServices Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new PetServices();
                }
                return _instance;
            }
        }

      private PetServices()
      {
         // _seedId = 1;
          _pets = new List<Pet>
          {
              new Dog { Age = 1, Breed = "Great Dane", Colors = "Black", Name = "Dakota", PetId = 1, Size = "Large" },
            new Dog { Age = 5, Breed = "Mixed", Colors = "Brown and White", Name = "Harley", PetId = 2, Size = "Medium" },
            new Cat { Age = 3, Colors = "grey and orange", Hair ="Long", Name ="Marvin",  PetId= 3 },
            new Cat { Age = 8, Colors = "White", Hair = "Long", Name = "Joe", PetId = 4 },
            new Bird {  Age = 24 , Colors = "blue, green, yellow, red", KindOfBird = "Macaw", Name = "Harvey", PetId = 5},
            new Bird { Age = 13, Colors = "Grey, red, black", KindOfBird = "African Grey", Name = "Smokey", PetId = 6 },
            new Other { Age = 1, Colors = "Gold", Name = "Unknown", PetId = 7, TypeOfOther="Fish" },
            new Other { TypeOfOther = "Gecko", PetId = 8,  Name = "None", Colors ="Green, white, yellow, orange", Age=0 }
          };
          
         // PopPets();
      }

        public List<Pet> GetPets()
        {
            return _pets;
        }

        public void PopPets()
        {
            
            
        }






    }
}