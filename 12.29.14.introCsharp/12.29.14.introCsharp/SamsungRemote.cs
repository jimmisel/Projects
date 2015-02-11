using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _12._29._14.introCsharp
{
    public class SamsungRemote : TVRemote
    {
        //base means TVRemote in this case
        public bool HasSmartHub { get; set; }
        public SamsungRemote() : base(RemoteBrand.Samsung)
        {
           
        }

        public override string ChangeChannelUp()
        {
            //might have code specific to changing a samsung tv channel
            return "Changed " + Brand + " channel up!";
        }
    }
}
