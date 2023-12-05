using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class HomePageController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
