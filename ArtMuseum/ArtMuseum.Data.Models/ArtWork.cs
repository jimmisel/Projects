using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtMuseum.Data.Models
{
    public class ArtWork
    {
        public int ArtWorkId { get; set; }
        public string Img { get; set; }
        public string ArtTitle { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
        public string UserName { get; set; }
    }
}
