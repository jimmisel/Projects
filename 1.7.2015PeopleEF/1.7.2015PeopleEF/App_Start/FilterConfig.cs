using System.Web;
using System.Web.Mvc;

namespace _1._7._2015PeopleEF
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
