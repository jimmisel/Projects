using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _12._29._14.introCsharp
{
    public class MemorexRemote : TVRemote
    {
        public MemorexRemote() : base(RemoteBrand.Memorex)
        {

        }

        public override string ChangeChannelUp()
        {
            return "Changed " + Brand + " channel up!";
        }
    }
}
