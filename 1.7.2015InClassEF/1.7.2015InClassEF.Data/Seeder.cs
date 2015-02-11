using _1._7._2015InClassEF.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Migrations;

namespace _1._7._2015InClassEF.Data
{
    public static class Seeder
    {
        public static void Seed(InvoiceData context)
        {
            InvoiceDataModel invoice = new InvoiceDataModel()
            {
                Description = "Thing",
                OrderDate = DateTime.Now,
                TotalCost = 3.99m
            };
            InvoiceDataModel invoice2 = new InvoiceDataModel()
            {
                Description = "Thing 2",
                OrderDate = DateTime.Now,
                TotalCost = 3.99m
            };

            context.Invoices.AddOrUpdate(i => i.Description, invoice, invoice2);
            context.SaveChanges();
        }



    }
}
