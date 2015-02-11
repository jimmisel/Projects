using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArtMuseum.Models
{
    public class ArtViewModel
    {
        public int ArtWorkId { get; set; }
        public string ArtTitle { get; set; }
        public string Img { get; set; }
        public string Description { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
    }

    public class ArtistViewModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public bool IsArtist { get; set; }
        public bool IsAdmin { get; set; }
    }
    public class IndexViewModel
    {
        public List<ArtViewModel> ArtWork { get; set; }
        
    }
    public class ArtistView
    {
        public List<ArtistViewModel> Artist { get; set; }
    }
}