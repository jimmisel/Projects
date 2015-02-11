using System.Web;
using System.Web.Mvc;

namespace RestReview1._2._15PairedTask
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
