using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//--Create a List of Dogs and loop through all the dogs and print to the console "Dog {name} is a {color} {breed}."


namespace CSharpIntoProjects
{
    class Program
    {
        static void Main(string[] args)
        {
            //make the list of the dogs
            List<Dog> dogs = new List<Dog>();

            Dog jimsDog = new Dog();
            jimsDog.name = "Fluffy";
            jimsDog.Color = "black";
            jimsDog.Breed = "Great Dane";
            dogs.Add(jimsDog);

            Dog nicksDog = new Dog();
            nicksDog.name = "tiny";
            nicksDog.Color = "brown and white";
            nicksDog.Breed = "bullDog";
            dogs.Add(nicksDog);

            foreach (Dog d in dogs)
            {
                Console.WriteLine("Dog "+d.name+" Is a " +d.Color+ " " +d.Breed + ".");
                Console.WriteLine();

               
            }
            Console.Read();
        }
    }
}
