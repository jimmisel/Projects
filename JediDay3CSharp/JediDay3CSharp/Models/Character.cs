using System;
using System.Collections.Generic;
using System.EnterpriseServices;
using System.Linq;
using System.Web;

//StarWars Jedi BountyHunters



//-On the Index view, use Polymorphism to make a list of type Character that holds all Jedi and BountyHunters.
//-Create a Jedi view that uses LINQ to filter the Character List to only show the Jedi. Type cast the filtered list back to Jedi to allow you to see the LightSaberColor property
//-Create a BountyHunter view that uses LINQ to filter the Character List to only show the Bounty Hunters. Type cast the filterest list back to Jedi to allow you to see the WeaponType property.


namespace JediDay3CSharp.Models
{
    public abstract class Character
    {
        public string Name { get; set; }
        public string Race { get; set; }
        public CharType Type { get; set; }
    }

    public class BountyHunter : Character
    {
        public string WeponType { get; set; }

        public BountyHunter()
        {
            Type = CharType.BountyHunter;
        }

    }

    public class Jedi : Character
    {
        public string LightSaberColor { get; set; }
        public Jedi()
        {
            Type = CharType.Jedi;
        }
    }


    public class ShowChars
    {
        public List<Character> Characters { get; set; }
    }

    public enum CharType
    {
   
        Jedi,
        BountyHunter
    }
}