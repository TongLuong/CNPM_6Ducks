using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace CNPM.Controllers
{
    public class HomePage : Controller
    {
        private SqlConnection conn;

        public HomePage()
        {
            conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DB_Printing"].ConnectionString);
            //conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DB_Printing"].ConnectionString);
        }

        public IActionResult Index()
        {
            return View("/Views/User/index.cshtml");
        }

        public IActionResult UserChangeInfo()
        {
            return View("/Views/User/UserChangeInfo/index.cshtml");
        }

        public IActionResult UserNotification()
        {
            return View("/Views/User/UserNotification/index.cshtml");
        }

        public IActionResult UserPrinting()
        {
            return View("/Views/User/UserPrinting/index.cshtml");
        }

        public IActionResult UserPrintingHistory()
        {
            return View("/Views/User/UserPrintingHistory/index.cshtml");
        }

        public IActionResult UserBuyPage()
        {
            return View("/Views/User/UserBuyPage/index.cshtml");
        }
    }
}
