using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class HomePage : Controller
    {
        public IActionResult Index()
        {
            return View("/Views/User/index.cshtml");
        }

        public IActionResult UserBuyPage()
        {
            return View("/Views/User/UserBuyPage/index.cshtml");
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
    }
}
