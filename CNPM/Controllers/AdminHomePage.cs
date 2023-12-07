using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class AdminHomePage : Controller
    {
        public IActionResult Index()
        {
            return View("/Views/Admin/index.cshtml");
        }
    }
}
