using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class AdminInfo : Controller
    {
        public IActionResult Index()
        {
            return View("/Views/Admin/admin-information.cshtml");
        }
    }
}
