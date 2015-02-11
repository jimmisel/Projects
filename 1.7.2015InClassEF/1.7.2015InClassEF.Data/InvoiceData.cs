using _1._7._2015InClassEF.Data.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _1._7._2015InClassEF.Data
{
    public class InvoiceData : DbContext
    {
        public InvoiceData() : base("DefaultConnection")
        {

        }
        public DbSet<InvoiceDataModel> Invoices { get; set; }
    }
}
