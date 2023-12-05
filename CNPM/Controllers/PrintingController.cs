using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class PrintingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
