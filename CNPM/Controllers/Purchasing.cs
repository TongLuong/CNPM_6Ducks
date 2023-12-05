using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class Purchasing : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
