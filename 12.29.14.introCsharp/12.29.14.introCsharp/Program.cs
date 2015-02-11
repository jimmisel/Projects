using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//install bing devoloper assistant
namespace _12._29._14.introCsharp
{
    class Program
    {
        static void Main(string[] args)
        {
            List<TVRemote> remotes = new List<TVRemote>();
            

            SamsungRemote jimsRemote = new SamsungRemote();
            jimsRemote.Color = "blue";
            jimsRemote.HasSmartHub = true;

            remotes.Add(jimsRemote);

            MemorexRemote nicksRemote = new MemorexRemote();
            nicksRemote.Color = "Red";

            remotes.Add(nicksRemote);

            
            foreach (TVRemote s in remotes)
            {
                Console.WriteLine("Color: "+ s.Color);
                Console.WriteLine("Brand: "+s.Brand);
                Console.WriteLine(s.ChangeChannelUp());
                if(s is SamsungRemote)
                {
                    SamsungRemote r = s as SamsungRemote;
                    Console.WriteLine("Has smart Hub Support: "+r.HasSmartHub);
                }
               
                Console.WriteLine();
            }
        

           
            Console.ReadLine();
        }
    }
}
