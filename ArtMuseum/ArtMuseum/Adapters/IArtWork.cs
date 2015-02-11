using ArtMuseum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtMuseum.Adapters
{
     interface IArtWork
    {
         List<ArtViewModel> GetArtWorks(string Id);
         List<ArtistViewModel> GetArtist();
         ArtViewModel GetOneArtWork(int id);
         ArtViewModel AddArt(ArtViewModel model);
    }
}
