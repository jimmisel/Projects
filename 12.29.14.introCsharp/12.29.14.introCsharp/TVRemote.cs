using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _12._29._14.introCsharp
{
   public abstract class TVRemote
    {
       //property
       //if private or public is not included private is the default
       //private class instance variable
       private string _color;
       //public instance property
       public string Color
       {
           get
           {
               return _color;
           }
           set
           {
               _color = value.ToUpper();
           }
       }

      
       public RemoteBrand Brand { get; private set; }
       

       //method
       public abstract string ChangeChannelUp();
      

       //this is there already it is not needed to be typed out. the compiler will add this for us
       //same name as the class and no idenitfier was added.
       //default constructor
       //type it out to make changes to it
       //public TVRemote()
       //{

       //}

       
       //overloading - overload the tvremote constructor
       public TVRemote(RemoteBrand brand)
       {
           Brand = brand;
       }
    }
    public enum RemoteBrand
    {
        Memorex,
        Samsung,
        Sony,
        Panasonic,
        LG
    }
}
