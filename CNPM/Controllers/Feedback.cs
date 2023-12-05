using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class Feedback : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
