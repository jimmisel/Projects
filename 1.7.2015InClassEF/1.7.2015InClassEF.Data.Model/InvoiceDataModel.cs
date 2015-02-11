using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _1._7._2015InClassEF.Data.Model
{
    public class InvoiceDataModel
    {
        [Key]
        public int InvoiceId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalCost { get; set; }
        public string Description { get; set; }

    }
}
