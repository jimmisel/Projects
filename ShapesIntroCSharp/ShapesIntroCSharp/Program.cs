using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


//--Create the following classes that inherit from Shape: Rectangle, Circle and Triangle. Override the Area method for each.
//--Create a list of type Shape and use Polymorphism to add Rectangles, Circles, and Triangles.
//--Loop through the List to write to the Console each shapes Area.

namespace ShapesIntroCSharp
{
    class Program
    {
        static void Main(string[] args)
        {

            List<Shape> shapes = new List<Shape>();

            Rectangle myRec = new Rectangle();
            shapes.Add(myRec);
            Circle myCir = new Circle();
            shapes.Add(myCir);
            Triangle myTri = new Triangle();
            shapes.Add(myTri);

            foreach (Shape s in shapes)
            {
                Console.WriteLine(s.Area());
                
            }
            Console.Read();
        }
    }
}





