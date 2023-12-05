using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class ManagePrinterController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
