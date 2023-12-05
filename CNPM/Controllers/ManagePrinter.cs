using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class ManagePrinter : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
