using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class User : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
