using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class AdminNotification : Controller
    {
        public IActionResult Index()
        {
            return View("/Views/Admin/notification.cshtml");
        }
    }
}
