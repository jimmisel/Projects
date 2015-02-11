using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio.Data.Models
{
    public class FrontPage
    {
        [Key]
        public int FrontPageId { get; set; }
        [Required]
        public string FrontPageBody { get; set; }
    }
}
